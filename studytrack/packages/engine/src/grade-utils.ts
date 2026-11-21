// ─── Grade Utilities ───
// AKTU grade scale lookup and SGPA computation.
// Verify against current AKTU ordinance before production use.

import { GRADE_SCALE, EXAM_STRUCTURE } from '@studytrack/data/config';

export interface GradeInfo {
  grade: string;
  points: number;
  total: number;
}

/**
 * Look up the grade and grade points for a total score (out of 100).
 * Returns the first matching grade from the scale (sorted highest-first).
 */
export function lookupGrade(total: number): GradeInfo {
  const clamped = Math.max(0, Math.min(EXAM_STRUCTURE.totalMax, Math.round(total)));
  for (const row of GRADE_SCALE) {
    if (clamped >= row.min) {
      return { grade: row.grade, points: row.points, total: clamped };
    }
  }
  // Fallback — should never reach here if GRADE_SCALE includes min:0
  return { grade: 'F', points: 0, total: clamped };
}

/**
 * Calculate SGPA from an array of { credits, gradePoints } per subject.
 * Formula: Σ(credits × gradePoints) ÷ Σ(credits)
 */
export function calculateSGPA(
  subjects: Array<{ credits: number; gradePoints: number }>
): number {
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  if (totalCredits === 0) return 0;
  const weightedSum = subjects.reduce((sum, s) => sum + s.credits * s.gradePoints, 0);
  return Number((weightedSum / totalCredits).toFixed(2));
}
