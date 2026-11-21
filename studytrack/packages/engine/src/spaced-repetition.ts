// ─── Spaced Repetition (SM-2 Algorithm) ───
// Implementation of the SuperMemo SM-2 algorithm for flashcard scheduling.
// Pure function — stateless, unit-testable.

import { SM2_DEFAULTS } from '@studytrack/data/config';

export interface ReviewResult {
  /** Updated ease factor */
  easeFactor: number;
  /** New interval in days */
  interval: number;
  /** Updated repetition count */
  repetitions: number;
  /** Next review date (ISO string) */
  nextReviewDate: string;
}

/**
 * Process a flashcard review using SM-2 algorithm.
 *
 * HOW IT WORKS:
 * - quality: user's self-assessment of recall (0–5)
 *   0 = "Complete blackout"
 *   1 = "Wrong, but remembered on seeing answer"
 *   2 = "Wrong, but answer seemed easy"
 *   3 = "Correct with significant difficulty"
 *   4 = "Correct with some hesitation"
 *   5 = "Perfect recall"
 *
 * - If quality < 3: reset to beginning (repetitions = 0, interval = 1)
 * - If quality ≥ 3: increase interval based on repetition count
 *   - 1st review: interval = 1 day
 *   - 2nd review: interval = 6 days
 *   - Subsequent: interval = previous_interval × ease_factor
 *
 * - Ease factor adjusts: EF' = EF + (0.1 - (5 - q) × (0.08 + (5 - q) × 0.02))
 *   - Minimum ease factor is 1.3 to prevent extremely short intervals
 */
export function reviewFlashcard(
  quality: number,
  currentEaseFactor: number = SM2_DEFAULTS.initialEaseFactor,
  currentInterval: number = SM2_DEFAULTS.initialInterval,
  currentRepetitions: number = 0,
  reviewDate: Date = new Date(),
): ReviewResult {
  // Clamp quality to 0–5
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  let easeFactor = currentEaseFactor;
  let interval: number;
  let repetitions: number;

  if (q < 3) {
    // Failed — reset
    repetitions = 0;
    interval = SM2_DEFAULTS.initialInterval;
  } else {
    // Passed
    repetitions = currentRepetitions + 1;

    if (repetitions === 1) {
      interval = SM2_DEFAULTS.initialInterval;
    } else if (repetitions === 2) {
      interval = SM2_DEFAULTS.graduatingInterval;
    } else {
      interval = Math.round(currentInterval * easeFactor);
    }
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  easeFactor = Math.max(SM2_DEFAULTS.minEaseFactor, easeFactor);

  // Calculate next review date
  const nextDate = new Date(reviewDate);
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    easeFactor: Number(easeFactor.toFixed(2)),
    interval,
    repetitions,
    nextReviewDate: nextDate.toISOString(),
  };
}

/**
 * Get the next review date for a flashcard given its current state.
 */
export function getNextReviewDate(
  interval: number,
  fromDate: Date = new Date(),
): string {
  const nextDate = new Date(fromDate);
  nextDate.setDate(nextDate.getDate() + interval);
  return nextDate.toISOString();
}
