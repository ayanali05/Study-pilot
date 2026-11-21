// ─── SGPA Predictor ───
// The HERO feature: predicts SGPA based on PYQ priority-weighted coverage,
// confidence, and test accuracy. Every number is explainable.

import type { Subject, SubjectProgress, TestResult } from '@studytrack/data';
import { PREDICTOR_WEIGHTS, EXAM_STRUCTURE } from '@studytrack/data/config';
import { lookupGrade, calculateSGPA } from './grade-utils';
import type { TopicPriorityResult } from './pyq-analyzer';

export interface SubjectPrediction {
  subjectId: string;
  subjectName: string;
  credits: number;

  /** Fraction of topics covered (simple %) */
  plainCoverage: number;
  /** Priority-weighted coverage: Σ(priority of covered) / Σ(priority of all) */
  priorityWeightedCoverage: number;
  /** The gap between the two — this is the insight */
  coverageGap: number;

  /** User-reported confidence (1–5), normalized to 0–1 */
  confidenceNormalized: number;
  /** Test accuracy for this subject (0–1), null if no tests */
  testAccuracy: number | null;

  /** Composite readiness score (0–1) */
  readiness: number;

  /** Predicted external marks (out of 70) */
  predictedExternal: number;
  /** User-input internal marks (out of 30) */
  internalMarks: number;
  /** Total predicted marks (out of 100) */
  predictedTotal: number;

  /** Grade and grade points from the lookup table */
  predictedGrade: string;
  predictedGradePoints: number;

  /** Full calculation breakdown for the explainability panel */
  calculation: {
    formula: string;
    coverageWeight: number;
    confidenceWeight: number;
    testWeight: number;
    realismCap: number;
    readinessRaw: number;
    readinessCapped: number;
  };
}

export interface SGPAPrediction {
  /** Final predicted SGPA */
  sgpa: number;

  /** Per-subject breakdowns */
  subjects: SubjectPrediction[];

  /** Total credits */
  totalCredits: number;

  /** Disclaimer — always shown */
  disclaimer: string;

  /** Data quality label */
  dataLabel: string;
}

/**
 * Predict SGPA from covered topics, PYQ priority analysis, confidence, and test results.
 *
 * HOW IT WORKS:
 * For each subject:
 * 1. priority_weighted_coverage = Σ(priority of covered topics) / Σ(priority of all topics)
 *    → This is the key insight: covering 60% of topics by count might mean only 40%
 *      of exam-relevant material if you skipped the high-priority ones.
 *
 * 2. readiness = 0.60 × priority_weighted_coverage
 *              + 0.25 × (confidence / 5)
 *              + 0.15 × test_accuracy
 *    → If no test data, redistribute: 0.75 × coverage + 0.25 × confidence
 *
 * 3. predicted_external = readiness × 70 × realism_cap
 *    → realism_cap (0.92) prevents over-optimistic predictions
 *
 * 4. total = predicted_external + internal_marks
 * 5. grade_point = lookup(total) from AKTU grade table
 * 6. SGPA = Σ(credits × grade_point) / Σ(credits)
 *
 * Label: "Estimate, not a guarantee."
 */
export function predictSGPA(
  subjects: Subject[],
  progress: SubjectProgress[],
  priorities: Map<string, TopicPriorityResult[]>,
  testResults: TestResult[],
): SGPAPrediction {
  const subjectPredictions: SubjectPrediction[] = [];

  for (const subject of subjects) {
    const subjectProgress = progress.find((p) => p.subjectId === subject.id);
    const topicPriorities = priorities.get(subject.id) ?? [];

    // ── All topics for this subject ──
    const allTopics = subject.units.flatMap((u) => u.topics);
    const totalTopicCount = allTopics.length;

    // ── Plain coverage ──
    const coveredTopicIds = new Set(
      (subjectProgress?.topics ?? [])
        .filter((t) => t.covered)
        .map((t) => t.topicId),
    );
    const plainCoverage = totalTopicCount > 0 ? coveredTopicIds.size / totalTopicCount : 0;

    // ── Priority-weighted coverage ──
    // Build a priority map for this subject's topics
    const priorityMap = new Map(topicPriorities.map((p) => [p.topicId, p.priorityScore]));
    let totalPriority = 0;
    let coveredPriority = 0;

    for (const topic of allTopics) {
      const prio = priorityMap.get(topic.id) ?? 0.3; // default to moderate if no PYQ data
      totalPriority += prio;
      if (coveredTopicIds.has(topic.id)) {
        coveredPriority += prio;
      }
    }

    const priorityWeightedCoverage = totalPriority > 0 ? coveredPriority / totalPriority : 0;
    const coverageGap = plainCoverage - priorityWeightedCoverage;

    // ── Confidence (1–5 → 0–1) ──
    const confidence = subjectProgress?.confidence ?? 3;
    const confidenceNormalized = confidence / 5;

    // ── Test accuracy for this subject ──
    const subjectTests = testResults.filter((t) => t.subjectId === subject.id);
    const testAccuracy =
      subjectTests.length > 0
        ? subjectTests.reduce((sum, t) => sum + t.accuracy, 0) / subjectTests.length
        : null;

    // ── Readiness score ──
    let readinessRaw: number;
    let coverageWeight: number;
    let confidenceWeight: number;
    let testWeight: number;

    if (testAccuracy !== null) {
      coverageWeight = PREDICTOR_WEIGHTS.coverage;
      confidenceWeight = PREDICTOR_WEIGHTS.confidence;
      testWeight = PREDICTOR_WEIGHTS.testAccuracy;
      readinessRaw =
        coverageWeight * priorityWeightedCoverage +
        confidenceWeight * confidenceNormalized +
        testWeight * testAccuracy;
    } else {
      // No test data: redistribute weights
      coverageWeight = 0.75;
      confidenceWeight = 0.25;
      testWeight = 0;
      readinessRaw =
        coverageWeight * priorityWeightedCoverage +
        confidenceWeight * confidenceNormalized;
    }

    const readinessCapped = Math.min(readinessRaw, 1) * PREDICTOR_WEIGHTS.realismCap;

    // ── Predicted marks ──
    const predictedExternal = Number(
      (readinessCapped * EXAM_STRUCTURE.externalMax).toFixed(1),
    );
    const internalMarks = subjectProgress?.internalMarks ?? 20; // default assumption
    const predictedTotal = predictedExternal + internalMarks;

    // ── Grade lookup ──
    const { grade, points } = lookupGrade(predictedTotal);

    subjectPredictions.push({
      subjectId: subject.id,
      subjectName: subject.name,
      credits: subject.credits,
      plainCoverage: Number(plainCoverage.toFixed(4)),
      priorityWeightedCoverage: Number(priorityWeightedCoverage.toFixed(4)),
      coverageGap: Number(coverageGap.toFixed(4)),
      confidenceNormalized: Number(confidenceNormalized.toFixed(2)),
      testAccuracy,
      readiness: Number(readinessCapped.toFixed(4)),
      predictedExternal,
      internalMarks,
      predictedTotal: Number(predictedTotal.toFixed(1)),
      predictedGrade: grade,
      predictedGradePoints: points,
      calculation: {
        formula: `readiness = ${coverageWeight}×coverage + ${confidenceWeight}×confidence${testWeight > 0 ? ` + ${testWeight}×testAccuracy` : ''}`,
        coverageWeight,
        confidenceWeight,
        testWeight,
        realismCap: PREDICTOR_WEIGHTS.realismCap,
        readinessRaw: Number(readinessRaw.toFixed(4)),
        readinessCapped: Number(readinessCapped.toFixed(4)),
      },
    });
  }

  const sgpa = calculateSGPA(
    subjectPredictions.map((s) => ({
      credits: s.credits,
      gradePoints: s.predictedGradePoints,
    })),
  );

  return {
    sgpa,
    subjects: subjectPredictions,
    totalCredits: subjectPredictions.reduce((sum, s) => sum + s.credits, 0),
    disclaimer: 'Estimate, not a guarantee. Based on sample data and heuristic analysis.',
    dataLabel: 'Sample dataset — not official AKTU data',
  };
}
