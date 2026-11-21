// ─── @studytrack/engine barrel export ───
// Pure TypeScript computation — no DOM, no network, no side effects.
// Every function is unit-testable and runs in browser or Node.

export { analyzePYQ, type TopicPriorityResult } from './pyq-analyzer.js';
export { predictSGPA, type SGPAPrediction, type SubjectPrediction } from './sgpa-predictor.js';
export { runMonteCarlo, type MonteCarloResult } from './monte-carlo.js';
export { getStudyRecommendations, type StudyRecommendation } from './recommender.js';
export { reviewFlashcard, getNextReviewDate, type ReviewResult } from './spaced-repetition.js';
export { generateStudyPlan, type GeneratedPlan } from './study-plan.js';
export { lookupGrade, calculateSGPA } from './grade-utils.js';
