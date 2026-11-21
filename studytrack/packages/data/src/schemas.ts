// ─── StudyTrack Zod Schemas ───
// Every piece of data in StudyTrack is validated by these schemas.
// Seed data, API responses, AI outputs — all pass through Zod.

import { z } from 'zod';

// ─── Syllabus Structure ───
export const TopicSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  unitId: z.string().min(1),
  subjectId: z.string().min(1),
  description: z.string().optional(),
  estimatedHours: z.number().positive().default(2),
  /** Topic IDs this topic depends on (for the knowledge graph) */
  prerequisites: z.array(z.string()).default([]),
  /** Tags for search / filtering */
  tags: z.array(z.string()).default([]),
});

export const UnitSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  subjectId: z.string().min(1),
  order: z.number().int().nonnegative(),
  topics: z.array(TopicSchema),
});

export const SubjectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  code: z.string().min(1),
  semester: z.number().int().positive(),
  branch: z.string().min(1),
  credits: z.number().int().positive(),
  units: z.array(UnitSchema),
});

export const SyllabusSchema = z.object({
  university: z.string().default('AKTU'),
  branch: z.string(),
  semester: z.number().int().positive(),
  /** Label: "Sample dataset — not official AKTU data" */
  dataLabel: z.string().default('Sample dataset — not official AKTU data'),
  subjects: z.array(SubjectSchema),
});

// ─── PYQ (Past Year Questions) ───
export const PYQQuestionSchema = z.object({
  id: z.string().min(1),
  topicId: z.string().min(1),
  subjectId: z.string().min(1),
  unitId: z.string().min(1),
  year: z.number().int().min(2015).max(2030),
  /** e.g. "2022-23 Odd Semester" */
  examSession: z.string().optional(),
  questionText: z.string().min(1),
  marks: z.number().int().positive(),
  type: z.enum(['short', 'long', 'mcq', 'numerical', 'diagram']),
});

export const PYQDataSchema = z.object({
  subjectId: z.string().min(1),
  /** Label: "Sample dataset" */
  dataLabel: z.string().default('Sample dataset — not official AKTU data'),
  totalYears: z.number().int().positive(),
  years: z.array(z.number().int()),
  questions: z.array(PYQQuestionSchema),
});

// ─── User Progress ───
export const TopicProgressSchema = z.object({
  topicId: z.string().min(1),
  subjectId: z.string().min(1),
  covered: z.boolean().default(false),
  coveredAt: z.string().datetime().optional(),
  confidence: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
  resources: z.array(z.string()).default([]),
  /** Time spent studying this topic (minutes) */
  timeSpent: z.number().nonnegative().default(0),
});

export const SubjectProgressSchema = z.object({
  subjectId: z.string().min(1),
  internalMarks: z.number().min(0).max(30).optional(),
  confidence: z.number().min(1).max(5).default(3),
  topics: z.array(TopicProgressSchema),
});

// ─── Study Sessions (from extension) ───
export const StudySessionSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  url: z.string().url(),
  domain: z.string().min(1),
  title: z.string(),
  /** Auto-detected or user-tagged subject */
  subjectId: z.string().optional(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  durationMinutes: z.number().nonnegative(),
  /** YouTube-specific metadata */
  youtube: z.object({
    videoId: z.string(),
    channelName: z.string().optional(),
    progress: z.number().min(0).max(1).optional(),
    chapters: z.array(z.object({
      title: z.string(),
      startTime: z.number(),
    })).optional(),
  }).optional(),
  /** Was this during a focus session? */
  focusSession: z.boolean().default(false),
});

// ─── Test Results ───
export const TestQuestionResultSchema = z.object({
  questionId: z.string(),
  topicId: z.string(),
  correct: z.boolean(),
  userAnswer: z.string().optional(),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
  /** Time taken in seconds */
  timeTaken: z.number().nonnegative().optional(),
});

export const TestResultSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  subjectId: z.string().min(1),
  mode: z.enum(['static', 'ai-generated']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  totalQuestions: z.number().int().positive(),
  correctAnswers: z.number().int().nonnegative(),
  accuracy: z.number().min(0).max(1),
  completedAt: z.string().datetime(),
  durationMinutes: z.number().nonnegative(),
  questions: z.array(TestQuestionResultSchema),
  /** Label for AI-generated tests */
  aiGenerated: z.boolean().default(false),
});

// ─── Flashcards ───
export const FlashcardSchema = z.object({
  id: z.string().min(1),
  topicId: z.string().min(1),
  subjectId: z.string().min(1),
  front: z.string().min(1),
  back: z.string().min(1),
  /** SM-2 scheduling fields */
  easeFactor: z.number().default(2.5),
  interval: z.number().int().default(0),
  repetitions: z.number().int().default(0),
  nextReviewDate: z.string().datetime(),
  lastReviewDate: z.string().datetime().optional(),
  /** Was this card AI-generated? */
  aiGenerated: z.boolean().default(false),
});

// ─── Bookmarks ───
export const BookmarkSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  url: z.string().url(),
  title: z.string(),
  subjectId: z.string().optional(),
  topicId: z.string().optional(),
  notes: z.string().optional(),
  timestamp: z.number().optional(), // YouTube timestamp in seconds
  createdAt: z.string().datetime(),
  tags: z.array(z.string()).default([]),
});

// ─── Gamification ───
export const BadgeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  icon: z.string(), // emoji or icon name
  earnedAt: z.string().datetime().optional(),
  condition: z.string(), // human-readable condition
});

export const UserStatsSchema = z.object({
  userId: z.string().min(1),
  xp: z.number().int().nonnegative().default(0),
  level: z.number().int().positive().default(1),
  currentStreak: z.number().int().nonnegative().default(0),
  longestStreak: z.number().int().nonnegative().default(0),
  totalStudyMinutes: z.number().nonnegative().default(0),
  totalSessionsCount: z.number().int().nonnegative().default(0),
  badges: z.array(BadgeSchema).default([]),
  /** Daily study map: { "2024-01-15": 45 } (minutes) */
  dailyStudyMap: z.record(z.string(), z.number()).default({}),
});

// ─── AI Outputs (validated before use) ───
export const AIExtractedQuestionSchema = z.object({
  questionText: z.string().min(1),
  marks: z.number().int().positive(),
  type: z.enum(['short', 'long', 'mcq', 'numerical', 'diagram']),
  detectedTopicName: z.string().optional(),
  confidence: z.number().min(0).max(1),
});

export const AIMCQSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
  explanation: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  topicId: z.string(),
  /** Must be true for AI-generated content */
  aiGenerated: z.literal(true),
});

export const AIFlashcardSchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
  topicId: z.string(),
  aiGenerated: z.literal(true),
});

export const AIChatResponseSchema = z.object({
  answer: z.string().min(1),
  citations: z.array(z.object({
    type: z.enum(['topic', 'pyq', 'note']),
    id: z.string(),
    label: z.string(),
  })).default([]),
  aiGenerated: z.literal(true),
});

// ─── Exam Plan ───
export const StudyPlanDaySchema = z.object({
  date: z.string(), // ISO date
  topics: z.array(z.object({
    topicId: z.string(),
    subjectId: z.string(),
    estimatedMinutes: z.number().positive(),
    type: z.enum(['new', 'review', 'test']),
    priority: z.enum(['critical', 'important', 'optional']),
  })),
  totalMinutes: z.number().nonnegative(),
});

export const ExamPlanSchema = z.object({
  examDate: z.string(), // ISO date
  dailyHours: z.number().positive(),
  startDate: z.string(), // ISO date
  days: z.array(StudyPlanDaySchema),
  generatedAt: z.string().datetime(),
});

// ─── Type exports ───
export type Topic = z.infer<typeof TopicSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Subject = z.infer<typeof SubjectSchema>;
export type Syllabus = z.infer<typeof SyllabusSchema>;
export type PYQQuestion = z.infer<typeof PYQQuestionSchema>;
export type PYQData = z.infer<typeof PYQDataSchema>;
export type TopicProgress = z.infer<typeof TopicProgressSchema>;
export type SubjectProgress = z.infer<typeof SubjectProgressSchema>;
export type StudySession = z.infer<typeof StudySessionSchema>;
export type TestQuestionResult = z.infer<typeof TestQuestionResultSchema>;
export type TestResult = z.infer<typeof TestResultSchema>;
export type Flashcard = z.infer<typeof FlashcardSchema>;
export type Bookmark = z.infer<typeof BookmarkSchema>;
export type Badge = z.infer<typeof BadgeSchema>;
export type UserStats = z.infer<typeof UserStatsSchema>;
export type AIExtractedQuestion = z.infer<typeof AIExtractedQuestionSchema>;
export type AIMCQ = z.infer<typeof AIMCQSchema>;
export type AIFlashcard = z.infer<typeof AIFlashcardSchema>;
export type AIChatResponse = z.infer<typeof AIChatResponseSchema>;
export type StudyPlanDay = z.infer<typeof StudyPlanDaySchema>;
export type ExamPlan = z.infer<typeof ExamPlanSchema>;
