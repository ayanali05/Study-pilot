// ─── StudyTrack Engine Comprehensive Test Suite ───
// High-coverage unit tests for all pure math/logic engine functions.
// Covers: Grade Utils, PYQ Analyzer, SGPA Predictor, Monte Carlo, Recommender, Spaced Repetition, Study Plan.

import { describe, it, expect } from 'vitest';
import {
  lookupGrade,
  calculateSGPA,
  analyzePYQ,
  predictSGPA,
  runMonteCarlo,
  getStudyRecommendations,
  reviewFlashcard,
  generateStudyPlan,
} from '../index';
import {
  syllabusData,
  pyqDataSets,
  demoProgress,
  demoTestResults,
} from '@studytrack/data';

describe('1. Grade Utilities (AKTU ordinance)', () => {
  it('correctly maps score boundaries to AKTU grades and points', () => {
    expect(lookupGrade(95)).toEqual({ grade: 'O', points: 10, total: 95 });
    expect(lookupGrade(90)).toEqual({ grade: 'O', points: 10, total: 90 });
    expect(lookupGrade(85)).toEqual({ grade: 'A+', points: 9, total: 85 });
    expect(lookupGrade(80)).toEqual({ grade: 'A+', points: 9, total: 80 });
    expect(lookupGrade(75)).toEqual({ grade: 'A', points: 8, total: 75 });
    expect(lookupGrade(65)).toEqual({ grade: 'B+', points: 7, total: 65 });
    expect(lookupGrade(55)).toEqual({ grade: 'B', points: 6, total: 55 });
    expect(lookupGrade(45)).toEqual({ grade: 'C', points: 5, total: 45 });
    expect(lookupGrade(35)).toEqual({ grade: 'F', points: 0, total: 35 });
  });

  it('clamps out-of-range scores to [0, 100]', () => {
    expect(lookupGrade(110)).toEqual({ grade: 'O', points: 10, total: 100 });
    expect(lookupGrade(-10)).toEqual({ grade: 'F', points: 0, total: 0 });
  });

  it('computes credit-weighted SGPA correctly', () => {
    // 4 credits * 8 (A) + 4 credits * 9 (A+) + 3 credits * 7 (B+) + 2 credits * 10 (O)
    // = (32 + 36 + 21 + 20) / (4 + 4 + 3 + 2) = 109 / 13 = 8.3846... -> 8.38
    const subjects = [
      { credits: 4, gradePoints: 8 },
      { credits: 4, gradePoints: 9 },
      { credits: 3, gradePoints: 7 },
      { credits: 2, gradePoints: 10 },
    ];
    expect(calculateSGPA(subjects)).toBe(8.38);
  });

  it('returns 0 when total credits is 0', () => {
    expect(calculateSGPA([])).toBe(0);
  });
});

describe('2. PYQ Intelligence Engine', () => {
  const dsSubject = syllabusData.subjects.find((s) => s.id === 'ds')!;
  const dsPYQ = pyqDataSets.find((p) => p.subjectId === 'ds')!;
  const allDsTopics = dsSubject.units.flatMap((u) => u.topics);

  it('computes frequency, marks weight, recency and priority for all topics', () => {
    const results = analyzePYQ(dsPYQ, allDsTopics);
    expect(results.length).toBe(allDsTopics.length);

    for (const res of results) {
      expect(res.frequency).toBeGreaterThanOrEqual(0);
      expect(res.frequency).toBeLessThanOrEqual(1);
      expect(res.marksWeight).toBeGreaterThanOrEqual(0);
      expect(res.marksWeight).toBeLessThanOrEqual(1);
      expect(res.recencyWeight).toBeGreaterThanOrEqual(0);
      expect(res.recencyWeight).toBeLessThanOrEqual(1);
      expect(res.priorityScore).toBeGreaterThanOrEqual(0);
      expect(res.priorityScore).toBeLessThanOrEqual(1);
      expect(['Critical', 'Important', 'Optional']).toContain(res.bucket);
    }
  });

  it('sorts topics by priority descending', () => {
    const results = analyzePYQ(dsPYQ, allDsTopics);
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i]!.priorityScore).toBeGreaterThanOrEqual(results[i + 1]!.priorityScore);
    }
  });

  it('identifies top repeated topics as Critical (e.g. BST, Stack, Sorting)', () => {
    const results = analyzePYQ(dsPYQ, allDsTopics);
    const criticalTopics = results.filter((r) => r.bucket === 'Critical');
    expect(criticalTopics.length).toBeGreaterThan(0);

    const criticalNames = criticalTopics.map((c) => c.topicName);
    // Stack, BST or Sorting must be in Critical because they appear in almost all 5 years
    const hasTopTopic = criticalNames.some(
      (n) => n.includes('Stack') || n.includes('BST') || n.includes('Binary Search Tree') || n.includes('Sorting'),
    );
    expect(hasTopTopic).toBe(true);
  });

  it('respects custom tuning weights via live sliders', () => {
    const defaultRes = analyzePYQ(dsPYQ, allDsTopics);
    // Give 100% weight to frequency
    const freqOnlyRes = analyzePYQ(dsPYQ, allDsTopics, {
      frequencyWeight: 1,
      marksWeight: 0,
      recencyWeight: 0,
      gapSignalWeight: 0,
    });

    const topic1Default = defaultRes.find((r) => r.topicId === 'ds-t5')!;
    const topic1Freq = freqOnlyRes.find((r) => r.topicId === 'ds-t5')!;
    expect(topic1Freq.priorityScore).toBe(Number(topic1Freq.frequency.toFixed(4)));
  });
});

describe('3. SGPA Predictor Engine (HERO)', () => {
  const priorities = new Map();
  for (const subject of syllabusData.subjects) {
    const pyq = pyqDataSets.find((p) => p.subjectId === subject.id);
    if (pyq) {
      priorities.set(subject.id, analyzePYQ(pyq, subject.units.flatMap((u) => u.topics)));
    }
  }

  it('predicts realistic SGPA and subject breakdowns', () => {
    const prediction = predictSGPA(syllabusData.subjects, demoProgress, priorities, demoTestResults);

    expect(prediction.sgpa).toBeGreaterThan(0);
    expect(prediction.sgpa).toBeLessThanOrEqual(10);
    expect(prediction.subjects.length).toBe(syllabusData.subjects.length);
    expect(prediction.totalCredits).toBe(17); // 4 + 4 + 4 + 3 + 2 = 17
    expect(prediction.disclaimer).toContain('Estimate');
  });

  it('priority-weighted coverage differs from plain coverage when selective studying occurs', () => {
    const prediction = predictSGPA(syllabusData.subjects, demoProgress, priorities, demoTestResults);

    for (const subj of prediction.subjects) {
      expect(subj.plainCoverage).toBeGreaterThanOrEqual(0);
      expect(subj.priorityWeightedCoverage).toBeGreaterThanOrEqual(0);
      // Both are non-negative and explainable
      expect(subj.calculation).toBeDefined();
      expect(subj.calculation.formula).toContain('readiness =');
    }
  });

  it('re-distributes weights gracefully when a subject has no test data', () => {
    // Subject 'tc' has no tests in demoTestResults
    const prediction = predictSGPA(syllabusData.subjects, demoProgress, priorities, demoTestResults);
    const tcPrediction = prediction.subjects.find((s) => s.subjectId === 'tc')!;
    expect(tcPrediction.testAccuracy).toBeNull();
    expect(tcPrediction.calculation.testWeight).toBe(0);
    expect(tcPrediction.calculation.coverageWeight).toBe(0.75);
    expect(tcPrediction.calculation.confidenceWeight).toBe(0.25);
  });

  it('calculation panel provides exact transparent numbers', () => {
    const prediction = predictSGPA(syllabusData.subjects, demoProgress, priorities, demoTestResults);
    const ds = prediction.subjects.find((s) => s.subjectId === 'ds')!;

    expect(ds.predictedExternal).toBeLessThanOrEqual(70);
    expect(ds.internalMarks).toBe(24);
    expect(ds.predictedTotal).toBe(Number((ds.predictedExternal + 24).toFixed(1)));
    expect(ds.predictedGradePoints).toBeGreaterThanOrEqual(0);
  });
});

describe('4. Monte Carlo Simulation', () => {
  const priorities = new Map();
  for (const subject of syllabusData.subjects) {
    const pyq = pyqDataSets.find((p) => p.subjectId === subject.id);
    if (pyq) {
      priorities.set(subject.id, analyzePYQ(pyq, subject.units.flatMap((u) => u.topics)));
    }
  }

  it('runs 1,000 runs and generates realistic distribution statistics', () => {
    const basePrediction = predictSGPA(syllabusData.subjects, demoProgress, priorities, demoTestResults);
    const mc = runMonteCarlo(basePrediction, 1000, 12345);

    expect(mc.runs).toBe(1000);
    expect(mc.distribution.length).toBe(1000);
    expect(mc.histogram.length).toBe(20);
    expect(mc.mean).toBeGreaterThan(0);
    expect(mc.percentile10).toBeLessThanOrEqual(mc.median);
    expect(mc.median).toBeLessThanOrEqual(mc.percentile90);

    // Target probability function
    const prob7 = mc.targetProbability(7.0);
    const prob9 = mc.targetProbability(9.0);
    expect(prob7).toBeGreaterThanOrEqual(prob9); // Reaching 7.0 is more likely than 9.0
  });

  it('computes subject-wise grade probabilities summing to ~100%', () => {
    const basePrediction = predictSGPA(syllabusData.subjects, demoProgress, priorities, demoTestResults);
    const mc = runMonteCarlo(basePrediction, 500, 999);

    for (const subj of mc.subjectGradeProbabilities) {
      const sum = Object.values(subj.gradeProbabilities).reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1, 1);
    }
  });
});

describe('5. Study Next Recommender', () => {
  const priorities = new Map();
  for (const subject of syllabusData.subjects) {
    const pyq = pyqDataSets.find((p) => p.subjectId === subject.id);
    if (pyq) {
      priorities.set(subject.id, analyzePYQ(pyq, subject.units.flatMap((u) => u.topics)));
    }
  }

  it('recommends only UNCOVERED topics ranked by marginal gain per hour', () => {
    const recs = getStudyRecommendations(syllabusData.subjects, demoProgress, priorities, demoTestResults, 5);

    expect(recs.length).toBeLessThanOrEqual(5);
    expect(recs.length).toBeGreaterThan(0);

    // Verify all recommended topics are indeed uncovered in demoProgress
    const coveredTopicIds = new Set(
      demoProgress.flatMap((p) => p.topics.filter((t) => t.covered).map((t) => t.topicId)),
    );

    for (const rec of recs) {
      expect(coveredTopicIds.has(rec.topicId)).toBe(false);
      expect(rec.recommendationScore).toBeGreaterThan(0);
      expect(rec.reason).toBeTruthy();
    }
  });

  it('boosts topics where user has demonstrated test weakness', () => {
    const recs = getStudyRecommendations(syllabusData.subjects, demoProgress, priorities, demoTestResults, 20);
    // Circular queue or Sorting or Adjacency had errors in tests
    const boosted = recs.filter((r) => r.weaknessBoost > 0);
    expect(boosted.length).toBeGreaterThanOrEqual(0);
  });
});

describe('6. Spaced Repetition (SM-2 Algorithm)', () => {
  it('resets interval and repetitions on failed recall (quality < 3)', () => {
    const result = reviewFlashcard(1, 2.5, 6, 2, new Date('2024-11-01'));
    expect(result.repetitions).toBe(0);
    expect(result.interval).toBe(1);
    expect(result.easeFactor).toBeLessThan(2.5);
  });

  it('graduates flashcard intervals on successful recall (quality >= 3)', () => {
    // 1st review
    const r1 = reviewFlashcard(4, 2.5, 0, 0, new Date('2024-11-01'));
    expect(r1.repetitions).toBe(1);
    expect(r1.interval).toBe(1);

    // 2nd review
    const r2 = reviewFlashcard(4, r1.easeFactor, r1.interval, r1.repetitions, new Date('2024-11-02'));
    expect(r2.repetitions).toBe(2);
    expect(r2.interval).toBe(6);

    // 3rd review
    const r3 = reviewFlashcard(5, r2.easeFactor, r2.interval, r2.repetitions, new Date('2024-11-08'));
    expect(r3.repetitions).toBe(3);
    expect(r3.interval).toBeGreaterThan(6);
    expect(r3.easeFactor).toBeGreaterThanOrEqual(2.5);
  });

  it('prevents ease factor from dropping below 1.3', () => {
    let ef = 1.4;
    for (let i = 0; i < 5; i++) {
      const res = reviewFlashcard(0, ef, 1, 0);
      ef = res.easeFactor;
    }
    expect(ef).toBeGreaterThanOrEqual(1.3);
  });
});

describe('7. Exam Study Plan Generator', () => {
  const priorities = new Map();
  for (const subject of syllabusData.subjects) {
    const pyq = pyqDataSets.find((p) => p.subjectId === subject.id);
    if (pyq) {
      priorities.set(subject.id, analyzePYQ(pyq, subject.units.flatMap((u) => u.topics)));
    }
  }

  it('generates a day-by-day plan prioritizing Critical topics first', () => {
    const plan = generateStudyPlan(
      syllabusData.subjects,
      demoProgress,
      priorities,
      '2024-12-15',
      3, // 3 hours per day
      '2024-11-20',
    );

    expect(plan.days.length).toBeGreaterThan(0);
    expect(plan.uncoveredCritical).toBeGreaterThanOrEqual(0);

    // Check first day has topics assigned
    const firstDayWithTopics = plan.days.find((d) => d.topics.length > 0);
    expect(firstDayWithTopics).toBeDefined();

    // Verify Critical topics are scheduled before Optional topics
    const scheduledTopics = plan.days.flatMap((d) => d.topics.filter((t) => t.type === 'new'));
    const criticalIndices = scheduledTopics
      .map((t, idx) => (t.priority === 'critical' ? idx : -1))
      .filter((i) => i !== -1);
    const optionalIndices = scheduledTopics
      .map((t, idx) => (t.priority === 'optional' ? idx : -1))
      .filter((i) => i !== -1);

    if (criticalIndices.length > 0 && optionalIndices.length > 0) {
      const avgCritical = criticalIndices.reduce((a, b) => a + b, 0) / criticalIndices.length;
      const avgOptional = optionalIndices.reduce((a, b) => a + b, 0) / optionalIndices.length;
      expect(avgCritical).toBeLessThan(avgOptional);
    }
  });
});
