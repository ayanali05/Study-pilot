// ─── @studytrack/engine barrel export ───
// Pure TypeScript computation — no DOM, no network, no side effects.
// Every function is unit-testable and runs in browser or Node.

export { analyzePYQ, type TopicPriorityResult } from './pyq-analyzer';
export { predictSGPA, type SGPAPrediction, type SubjectPrediction } from './sgpa-predictor';
export { runMonteCarlo, type MonteCarloResult } from './monte-carlo';
export { getStudyRecommendations, type StudyRecommendation } from './recommender';
export { reviewFlashcard, getNextReviewDate, type ReviewResult } from './spaced-repetition';
export { generateStudyPlan, type GeneratedPlan } from './study-plan';
export { lookupGrade, calculateSGPA } from './grade-utils';
