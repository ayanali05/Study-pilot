// ─── Monte Carlo SGPA Simulation ───
// Runs 10,000 simulations adding uncertainty per subject to produce
// an SGPA distribution: histogram, median, percentiles, and
// "probability of reaching your target SGPA".

import type { SubjectPrediction, SGPAPrediction } from './sgpa-predictor.js';
import { lookupGrade, calculateSGPA } from './grade-utils.js';

export interface MonteCarloResult {
  /** Number of simulation runs */
  runs: number;
  /** All simulated SGPA values (sorted ascending) */
  distribution: number[];
  /** Histogram buckets for visualization */
  histogram: Array<{ binStart: number; binEnd: number; count: number; percentage: number }>;
  /** Summary statistics */
  mean: number;
  median: number;
  stdDev: number;
  percentile10: number;
  percentile25: number;
  percentile75: number;
  percentile90: number;
  /** Per-subject grade probability distributions */
  subjectGradeProbabilities: Array<{
    subjectId: string;
    subjectName: string;
    gradeProbabilities: Record<string, number>; // e.g., { "A": 0.62, "B+": 0.28, ... }
  }>;
  /** Probability of reaching a target SGPA */
  targetProbability: (target: number) => number;
  /** Label */
  disclaimer: string;
}

/**
 * Seeded PRNG for reproducible simulations.
 * Uses a simple xorshift32 algorithm.
 */
function createRNG(seed: number) {
  let state = seed;
  return function next(): number {
    state ^= state << 13;
    state ^= state >> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xFFFFFFFF;
  };
}

/**
 * Box-Muller transform: generate a normally-distributed random number
 * from two uniform random numbers.
 */
function normalRandom(rng: () => number, mean: number, stdDev: number): number {
  const u1 = rng();
  const u2 = rng();
  const z = Math.sqrt(-2 * Math.log(Math.max(u1, 1e-10))) * Math.cos(2 * Math.PI * u2);
  return mean + stdDev * z;
}

/**
 * Run Monte Carlo simulation on SGPA prediction.
 *
 * HOW IT WORKS:
 * 1. For each subject, the base prediction gives predicted external marks.
 * 2. Each simulation run adds Gaussian noise to the external marks per subject.
 * 3. The noise standard deviation is wider when:
 *    - Coverage is lower (more uncertainty about unknown topics)
 *    - No test data exists (less calibration data)
 *    - Confidence is low
 * 4. Each perturbed total is grade-looked-up, and SGPA is recomputed.
 * 5. After all runs, we get a distribution of SGPAs.
 *
 * Label: "Estimate, not a guarantee."
 */
export function runMonteCarlo(
  prediction: SGPAPrediction,
  runs: number = 10_000,
  seed: number = 42,
): MonteCarloResult {
  const rng = createRNG(seed);
  const sgpaValues: number[] = [];
  const subjectGradeCounts: Array<Map<string, number>> = prediction.subjects.map(() => new Map());

  for (let run = 0; run < runs; run++) {
    const subjectResults: Array<{ credits: number; gradePoints: number }> = [];

    for (let si = 0; si < prediction.subjects.length; si++) {
      const subj = prediction.subjects[si]!;

      // ── Compute uncertainty (standard deviation of noise) ──
      // Higher uncertainty when: low coverage, no tests, low confidence
      const coverageUncertainty = (1 - subj.priorityWeightedCoverage) * 12; // 0–12 marks
      const testUncertainty = subj.testAccuracy === null ? 5 : (1 - subj.testAccuracy) * 4;
      const confidenceUncertainty = (1 - subj.confidenceNormalized) * 3;

      const totalStdDev = Math.sqrt(
        coverageUncertainty ** 2 + testUncertainty ** 2 + confidenceUncertainty ** 2,
      );

      // ── Add noise to external marks ──
      const noisyExternal = normalRandom(rng, subj.predictedExternal, totalStdDev);
      const clampedExternal = Math.max(0, Math.min(70, noisyExternal));
      const noisyTotal = clampedExternal + subj.internalMarks;

      const { grade, points } = lookupGrade(noisyTotal);
      subjectResults.push({ credits: subj.credits, gradePoints: points });

      // Count grades for this subject
      const gradeMap = subjectGradeCounts[si]!;
      gradeMap.set(grade, (gradeMap.get(grade) ?? 0) + 1);
    }

    const sgpa = calculateSGPA(subjectResults);
    sgpaValues.push(sgpa);
  }

  // Sort for percentile calculations
  sgpaValues.sort((a, b) => a - b);

  // ── Summary statistics ──
  const mean = sgpaValues.reduce((s, v) => s + v, 0) / runs;
  const variance = sgpaValues.reduce((s, v) => s + (v - mean) ** 2, 0) / runs;
  const stdDev = Math.sqrt(variance);

  const percentile = (p: number) => {
    const idx = Math.floor(p * runs);
    return sgpaValues[Math.min(idx, runs - 1)]!;
  };

  // ── Histogram (20 bins from 0 to 10) ──
  const binCount = 20;
  const binWidth = 10 / binCount;
  const histogram = Array.from({ length: binCount }, (_, i) => ({
    binStart: Number((i * binWidth).toFixed(1)),
    binEnd: Number(((i + 1) * binWidth).toFixed(1)),
    count: 0,
    percentage: 0,
  }));

  for (const sgpa of sgpaValues) {
    const bin = Math.min(Math.floor(sgpa / binWidth), binCount - 1);
    histogram[bin]!.count++;
  }
  for (const bin of histogram) {
    bin.percentage = Number(((bin.count / runs) * 100).toFixed(1));
  }

  // ── Grade probabilities per subject ──
  const subjectGradeProbabilities = prediction.subjects.map((subj, i) => {
    const counts = subjectGradeCounts[i]!;
    const probs: Record<string, number> = {};
    for (const [grade, count] of counts) {
      probs[grade] = Number((count / runs).toFixed(4));
    }
    return {
      subjectId: subj.subjectId,
      subjectName: subj.subjectName,
      gradeProbabilities: probs,
    };
  });

  return {
    runs,
    distribution: sgpaValues,
    histogram,
    mean: Number(mean.toFixed(2)),
    median: percentile(0.5),
    stdDev: Number(stdDev.toFixed(2)),
    percentile10: percentile(0.1),
    percentile25: percentile(0.25),
    percentile75: percentile(0.75),
    percentile90: percentile(0.9),
    subjectGradeProbabilities,
    targetProbability: (target: number) => {
      const count = sgpaValues.filter((v) => v >= target).length;
      return Number((count / runs).toFixed(4));
    },
    disclaimer: 'Estimate based on Monte Carlo simulation. Not a guarantee.',
  };
}
