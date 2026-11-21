// ─── StudyTrack Feature Flags & Configuration ───
// Single source of truth for all feature flags, tuning knobs, and constants.
// In hackathon demo mode, everything works with no login and pre-seeded data.

// Safe env access that works in Node, browsers, and bundlers
function getEnv(key: string, fallback: string): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = typeof globalThis !== 'undefined' ? (globalThis as any).process : undefined;
    return p?.env?.[key] || fallback;
  } catch {
    return fallback;
  }
}

export const featureFlags = {
  /** When false, skip all auth checks; app opens straight to dashboard */
  AUTH_ENABLED: getEnv('NEXT_PUBLIC_AUTH_ENABLED', 'false') === 'true',

  /** When true, use a fixed demo user + pre-seeded data */
  DEMO_MODE: getEnv('NEXT_PUBLIC_DEMO_MODE', 'true') === 'true',

  /** When false, all AI features fall back to rule-based / cached responses */
  AI_ENABLED: getEnv('NEXT_PUBLIC_AI_ENABLED', 'true') === 'true',

  /** Enable Supabase Realtime for live extension → dashboard sync */
  REALTIME_ENABLED: true,

  /** Enable gamification (XP, badges, streaks) */
  GAMIFICATION_ENABLED: true,

  /** Enable i18n toggle (English ↔ Hinglish) */
  I18N_ENABLED: true,
} as const;

// ─── AKTU Grade Scale ───
// Verify against current AKTU ordinance before using in production.
export const GRADE_SCALE = [
  { min: 90, grade: 'O', points: 10 },
  { min: 80, grade: 'A+', points: 9 },
  { min: 70, grade: 'A', points: 8 },
  { min: 60, grade: 'B+', points: 7 },
  { min: 50, grade: 'B', points: 6 },
  { min: 40, grade: 'C', points: 5 },
  { min: 0, grade: 'F', points: 0 },
] as const;

// ─── SGPA Predictor Weights ───
export const PREDICTOR_WEIGHTS = {
  /** Weight for priority-weighted coverage (how much of important stuff you studied) */
  coverage: 0.60,
  /** Weight for self-reported confidence (1–5 scale) */
  confidence: 0.25,
  /** Weight for test accuracy */
  testAccuracy: 0.15,
  /** Cap factor to prevent over-optimistic predictions */
  realismCap: 0.92,
} as const;

// ─── PYQ Priority Weights ───
// These control how topics are ranked. Tunable live in the UI via sliders.
export const PYQ_WEIGHTS = {
  frequency: 0.35,
  marksWeight: 0.25,
  recency: 0.25,
  gapSignal: 0.15,
} as const;

// ─── Priority Buckets ───
export const PRIORITY_BUCKETS = {
  critical: { min: 0.7, label: 'Critical', color: '#ef4444' },
  important: { min: 0.4, label: 'Important', color: '#f59e0b' },
  optional: { min: 0, label: 'Optional', color: '#22c55e' },
} as const;

// ─── AKTU Internal/External Split ───
export const EXAM_STRUCTURE = {
  externalMax: 70,
  internalMax: 30,
  totalMax: 100,
  /** Note shown to users */
  disclaimer: 'Verify against the current AKTU ordinance.',
} as const;

// ─── Demo User ───
export const DEMO_USER = {
  id: 'demo-user-001',
  name: 'DEEPAK PANDEY',
  rollNo: '2501660100055',
  branch: 'CSE',
  semester: 3,
  university: 'AKTU',
  enrollmentYear: 2025,
} as const;

// ─── Spaced Repetition (SM-2 defaults) ───
export const SM2_DEFAULTS = {
  initialEaseFactor: 2.5,
  minEaseFactor: 1.3,
  initialInterval: 1, // days
  graduatingInterval: 6, // days
} as const;

// ─── Gamification ───
export const XP_RULES = {
  topicCovered: 20,
  testCompleted: 50,
  flashcardReviewed: 5,
  focusSessionCompleted: 30,
  streakDay: 10,
  allCriticalCovered: 200,
} as const;

export const LEVELS = [
  { level: 1, minXp: 0, title: 'Freshman' },
  { level: 2, minXp: 100, title: 'Curious' },
  { level: 3, minXp: 300, title: 'Explorer' },
  { level: 4, minXp: 600, title: 'Scholar' },
  { level: 5, minXp: 1000, title: 'Ace' },
  { level: 6, minXp: 1500, title: 'Topper' },
  { level: 7, minXp: 2500, title: 'Legend' },
] as const;

// ─── Focus Mode ───
export const POMODORO_DEFAULTS = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
} as const;

// ─── Default blocked sites for focus mode ───
export const DEFAULT_BLOCKED_SITES = [
  'instagram.com',
  'twitter.com',
  'x.com',
  'facebook.com',
  'reddit.com',
  'tiktok.com',
] as const;

// ─── Whitelisted study domains for extension tracking ───
export const DEFAULT_STUDY_DOMAINS = [
  'youtube.com',
  'geeksforgeeks.org',
  'javatpoint.com',
  'tutorialspoint.com',
  'w3schools.com',
  'leetcode.com',
  'hackerrank.com',
  'codechef.com',
  'codeforces.com',
  'stackoverflow.com',
  'github.com',
  'npmjs.com',
  'docs.google.com',
  'drive.google.com',
  'classroom.google.com',
  'nptel.ac.in',
  'coursera.org',
  'udemy.com',
  'khanacademy.org',
  'wikipedia.org',
  'medium.com',
  'dev.to',
] as const;
