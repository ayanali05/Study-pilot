// ─── PYQ Analyzer ───
// Core intelligence: computes per-topic priority scores from past-year question data.
// Pure function — no network, no DOM. Fully unit-testable.

import type { PYQData, PYQQuestion, Topic } from '@studytrack/data';
import { PYQ_WEIGHTS, PRIORITY_BUCKETS } from '@studytrack/data/config';

export interface TopicPriorityResult {
  topicId: string;
  topicName: string;
  subjectId: string;
  unitId: string;
  /** Fraction of years this topic appeared in (0–1) */
  frequency: number;
  /** Average marks for this topic / subject max marks (0–1) */
  marksWeight: number;
  /** Recency-weighted score: recent years count more (0–1) */
  recencyWeight: number;
  /** Gap signal: historically frequent but recently absent (0–1) */
  gapSignal: number;
  /** Final priority score = weighted sum of above (0–1) */
  priorityScore: number;
  /** Bucket: Critical / Important / Optional */
  bucket: 'Critical' | 'Important' | 'Optional';
  /** Number of years this topic appeared */
  yearsAppeared: number;
  /** Total number of questions across all years */
  totalQuestions: number;
  /** Average marks when asked */
  averageMarks: number;
  /** Most recent year the topic appeared */
  lastAppearedYear: number | null;
  /** Years since last appearance (gap) */
  yearsSinceLastAppearance: number | null;
  /** Questions grouped by year */
  questionsByYear: Record<number, PYQQuestion[]>;
}

export interface PYQAnalysisConfig {
  frequencyWeight?: number;
  marksWeight?: number;
  recencyWeight?: number;
  gapSignalWeight?: number;
}

/**
 * Analyze PYQ data and compute per-topic priority scores.
 *
 * HOW IT WORKS:
 * 1. For each topic, we gather all questions across all years.
 * 2. Frequency = (years the topic appeared) / (total years in dataset)
 * 3. Marks weight = (avg marks for this topic) / (max marks in any single question for the subject)
 * 4. Recency = weighted sum where recent years get exponentially higher weights
 * 5. Gap signal = topic was frequent historically but absent recently → "due" for reappearance
 * 6. Priority = weighted sum of all four signals
 * 7. Bucket = Critical (≥0.7), Important (≥0.4), Optional (< 0.4)
 *
 * The gap signal is a HEURISTIC — it doesn't guarantee the topic will appear.
 * The UI shows this with a clear caveat.
 */
export function analyzePYQ(
  pyqData: PYQData,
  topics: Topic[],
  config: PYQAnalysisConfig = {},
): TopicPriorityResult[] {
  const weights = {
    frequency: config.frequencyWeight ?? PYQ_WEIGHTS.frequency,
    marks: config.marksWeight ?? PYQ_WEIGHTS.marksWeight,
    recency: config.recencyWeight ?? PYQ_WEIGHTS.recency,
    gap: config.gapSignalWeight ?? PYQ_WEIGHTS.gapSignal,
  };

  const { years, questions } = pyqData;
  const sortedYears = [...years].sort((a, b) => a - b);
  const totalYears = sortedYears.length;
  const latestYear = sortedYears[sortedYears.length - 1] ?? 0;

  // Find max marks in a single question (for normalizing marks weight)
  const maxMarks = Math.max(...questions.map((q) => q.marks), 1);

  // Group questions by topic
  const questionsByTopic = new Map<string, PYQQuestion[]>();
  for (const q of questions) {
    const existing = questionsByTopic.get(q.topicId) ?? [];
    existing.push(q);
    questionsByTopic.set(q.topicId, existing);
  }

  // Build a topic name map for quick lookup
  const topicNameMap = new Map(topics.map((t) => [t.id, t.name]));

  const results: TopicPriorityResult[] = [];

  for (const topic of topics) {
    const topicQuestions = questionsByTopic.get(topic.id) ?? [];

    // Questions grouped by year
    const questionsByYear: Record<number, PYQQuestion[]> = {};
    const appearedYears = new Set<number>();

    for (const q of topicQuestions) {
      appearedYears.add(q.year);
      if (!questionsByYear[q.year]) {
        questionsByYear[q.year] = [];
      }
      questionsByYear[q.year]!.push(q);
    }

    const yearsAppeared = appearedYears.size;
    const totalQuestionCount = topicQuestions.length;

    // ── 1. Frequency (0–1) ──
    const frequency = totalYears > 0 ? yearsAppeared / totalYears : 0;

    // ── 2. Marks Weight (0–1) ──
    const averageMarks =
      totalQuestionCount > 0
        ? topicQuestions.reduce((sum, q) => sum + q.marks, 0) / totalQuestionCount
        : 0;
    const marksWeight = maxMarks > 0 ? averageMarks / maxMarks : 0;

    // ── 3. Recency Weight (0–1) ──
    // More recent years get exponentially higher weight
    let recencyScore = 0;
    if (totalYears > 0 && yearsAppeared > 0) {
      let recencyNum = 0;
      let recencyDen = 0;
      for (let i = 0; i < sortedYears.length; i++) {
        const year = sortedYears[i]!;
        // Weight: 2^(position) where position 0 = oldest, N-1 = newest
        const yearWeight = Math.pow(2, i);
        recencyDen += yearWeight;
        if (appearedYears.has(year)) {
          recencyNum += yearWeight;
        }
      }
      recencyScore = recencyDen > 0 ? recencyNum / recencyDen : 0;
    }

    // ── 4. Gap Signal (0–1) ──
    // If a topic was historically frequent but hasn't appeared recently, it may be "due"
    const sortedAppearedYears = [...appearedYears].sort((a, b) => a - b);
    const lastAppearedYear = sortedAppearedYears[sortedAppearedYears.length - 1] ?? null;
    const yearsSinceLastAppearance =
      lastAppearedYear !== null ? latestYear - lastAppearedYear : null;

    let gapSignal = 0;
    if (
      yearsSinceLastAppearance !== null &&
      yearsSinceLastAppearance >= 2 &&
      frequency >= 0.4 // was historically frequent
    ) {
      // The longer the gap + the higher the historical frequency = stronger signal
      gapSignal = Math.min(1, (yearsSinceLastAppearance / totalYears) * frequency * 2);
    }

    // ── 5. Priority Score (weighted sum, 0–1) ──
    const priorityScore =
      weights.frequency * frequency +
      weights.marks * marksWeight +
      weights.recency * recencyScore +
      weights.gap * gapSignal;

    // Clamp to [0, 1]
    const clampedScore = Math.max(0, Math.min(1, priorityScore));

    // ── 6. Bucket ──
    let bucket: 'Critical' | 'Important' | 'Optional';
    if (clampedScore >= PRIORITY_BUCKETS.critical.min) {
      bucket = 'Critical';
    } else if (clampedScore >= PRIORITY_BUCKETS.important.min) {
      bucket = 'Important';
    } else {
      bucket = 'Optional';
    }

    results.push({
      topicId: topic.id,
      topicName: topicNameMap.get(topic.id) ?? topic.name,
      subjectId: topic.subjectId,
      unitId: topic.unitId,
      frequency,
      marksWeight,
      recencyWeight: recencyScore,
      gapSignal,
      priorityScore: Number(clampedScore.toFixed(4)),
      bucket,
      yearsAppeared,
      totalQuestions: totalQuestionCount,
      averageMarks: Number(averageMarks.toFixed(1)),
      lastAppearedYear,
      yearsSinceLastAppearance,
      questionsByYear,
    });
  }

  // Sort by priority score descending
  results.sort((a, b) => b.priorityScore - a.priorityScore);
  return results;
}
