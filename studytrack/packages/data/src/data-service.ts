// ─── Data Service ───
// Unified data access layer with Supabase (online) + IndexedDB (offline) fallback.
// In DEMO_MODE, always loads from seed data.
// When Supabase is unreachable (free tier paused), silently falls back to local.

import type {
  Syllabus, SubjectProgress, StudySession, TestResult,
  UserStats, Flashcard, Bookmark, PYQData, TodoTask,
} from './schemas';
import { featureFlags, DEMO_USER } from './config';
import { syllabusData } from './seed/syllabus';
import { pyqDataSets } from './seed/pyq-data';
import {
  demoProgress, demoSessions, demoTestResults,
  demoUserStats, demoFlashcards, demoBookmarks, demoTodoTasks,
} from './seed/demo-progress';

// ─── Types ───
export interface DataService {
  getSyllabus(): Promise<Syllabus>;
  getPYQData(): Promise<PYQData[]>;
  getProgress(): Promise<SubjectProgress[]>;
  updateTopicProgress(topicId: string, covered: boolean, confidence?: number): Promise<void>;
  updateSubjectInternalMarks(subjectId: string, marks: number): Promise<void>;
  getSessions(): Promise<StudySession[]>;
  addSession(session: StudySession): Promise<void>;
  getTestResults(): Promise<TestResult[]>;
  addTestResult(result: TestResult): Promise<void>;
  getUserStats(): Promise<UserStats>;
  updateUserStats(stats: Partial<UserStats>): Promise<void>;
  getFlashcards(): Promise<Flashcard[]>;
  updateFlashcard(flashcard: Flashcard): Promise<void>;
  getBookmarks(): Promise<Bookmark[]>;
  addBookmark(bookmark: Bookmark): Promise<void>;
  getTodoTasks(): Promise<TodoTask[]>;
  saveTodoTasks(tasks: TodoTask[]): Promise<void>;
  isOnline(): boolean;
  reset(): Promise<void>;
}

// ─── IndexedDB Store Names ───
const DB_NAME = 'studytrack';
const DB_VERSION = 1;
const STORES = {
  progress: 'progress',
  sessions: 'sessions',
  tests: 'tests',
  stats: 'stats',
  flashcards: 'flashcards',
  bookmarks: 'bookmarks',
  tasks: 'tasks',
} as const;

/**
 * Open IndexedDB (creates stores on first run).
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const storeName of Object.values(STORES)) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Generic IndexedDB CRUD helpers.
 */
async function idbGetAll<T>(storeName: string): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error);
  });
}

async function idbPut<T>(storeName: string, data: T): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.put(data);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbClear(storeName: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ─── Seed IndexedDB with demo data ───
async function seedDemoData(): Promise<void> {
  // Check if already seeded
  const existing = await idbGetAll<SubjectProgress>(STORES.progress);
  if (existing.length > 0) return;

  // Seed progress (use subjectId as id)
  for (const sp of demoProgress) {
    await idbPut(STORES.progress, { ...sp, id: sp.subjectId });
  }

  // Seed sessions
  for (const session of demoSessions) {
    await idbPut(STORES.sessions, session);
  }

  // Seed test results
  for (const test of demoTestResults) {
    await idbPut(STORES.tests, test);
  }

  // Seed stats
  await idbPut(STORES.stats, { ...demoUserStats, id: DEMO_USER.id });

  // Seed flashcards
  for (const fc of demoFlashcards) {
    await idbPut(STORES.flashcards, fc);
  }

  // Seed bookmarks
  for (const bk of demoBookmarks) {
    await idbPut(STORES.bookmarks, bk);
  }
}

// ─── Create the Data Service ───
export function createDataService(): DataService {
  let _isOnline = false;

  // On creation, seed demo data if in DEMO_MODE
  if (featureFlags.DEMO_MODE && typeof indexedDB !== 'undefined') {
    seedDemoData().catch(console.error);
  }

  return {
    async getSyllabus(): Promise<Syllabus> {
      // Syllabus always comes from seed data (static, bundled)
      return syllabusData;
    },

    async getPYQData(): Promise<PYQData[]> {
      // PYQ data always comes from seed data (static, bundled)
      return pyqDataSets;
    },

    async getProgress(): Promise<SubjectProgress[]> {
      try {
        const stored = await idbGetAll<SubjectProgress & { id: string }>(STORES.progress);
        if (stored.length > 0) {
          return stored.map(({ id: _id, ...rest }) => rest as SubjectProgress);
        }
      } catch {
        // IndexedDB not available, fall through
      }
      return demoProgress;
    },

    async updateTopicProgress(topicId: string, covered: boolean, confidence?: number): Promise<void> {
      const allProgress = await this.getProgress();
      for (const sp of allProgress) {
        const topic = sp.topics.find((t) => t.topicId === topicId);
        if (topic) {
          topic.covered = covered;
          if (covered) {
            topic.coveredAt = new Date().toISOString();
          }
          if (confidence !== undefined) {
            topic.confidence = confidence;
          }
          await idbPut(STORES.progress, { ...sp, id: sp.subjectId });
          break;
        }
      }
    },

    async updateSubjectInternalMarks(subjectId: string, marks: number): Promise<void> {
      const allProgress = await this.getProgress();
      const sp = allProgress.find((p) => p.subjectId === subjectId);
      if (sp) {
        sp.internalMarks = marks;
        await idbPut(STORES.progress, { ...sp, id: sp.subjectId });
      }
    },

    async getSessions(): Promise<StudySession[]> {
      try {
        const stored = await idbGetAll<StudySession>(STORES.sessions);
        if (stored.length > 0) return stored;
      } catch {
        // fall through
      }
      return demoSessions;
    },

    async addSession(session: StudySession): Promise<void> {
      await idbPut(STORES.sessions, session);
    },

    async getTestResults(): Promise<TestResult[]> {
      try {
        const stored = await idbGetAll<TestResult>(STORES.tests);
        if (stored.length > 0) return stored;
      } catch {
        // fall through
      }
      return demoTestResults;
    },

    async addTestResult(result: TestResult): Promise<void> {
      await idbPut(STORES.tests, result);
    },

    async getUserStats(): Promise<UserStats> {
      try {
        const stored = await idbGetAll<UserStats & { id: string }>(STORES.stats);
        if (stored.length > 0) {
          const { id: _id, ...stats } = stored[0]!;
          return stats as UserStats;
        }
      } catch {
        // fall through
      }
      return demoUserStats;
    },

    async updateUserStats(updates: Partial<UserStats>): Promise<void> {
      const current = await this.getUserStats();
      const updated = { ...current, ...updates, id: current.userId };
      await idbPut(STORES.stats, updated);
    },

    async getFlashcards(): Promise<Flashcard[]> {
      try {
        const stored = await idbGetAll<Flashcard>(STORES.flashcards);
        if (stored.length > 0) return stored;
      } catch {
        // fall through
      }
      return demoFlashcards;
    },

    async updateFlashcard(flashcard: Flashcard): Promise<void> {
      await idbPut(STORES.flashcards, flashcard);
    },

    async getBookmarks(): Promise<Bookmark[]> {
      try {
        const stored = await idbGetAll<Bookmark>(STORES.bookmarks);
        if (stored.length > 0) return stored;
      } catch {
        // fall through
      }
      return demoBookmarks;
    },

    async addBookmark(bookmark: Bookmark): Promise<void> {
      await idbPut(STORES.bookmarks, bookmark);
    },

    async getTodoTasks(): Promise<TodoTask[]> {
      try {
        const stored = await idbGetAll<TodoTask>(STORES.tasks);
        if (stored.length > 0) return stored;
      } catch {}
      return demoTodoTasks;
    },

    async saveTodoTasks(tasks: TodoTask[]): Promise<void> {
      try {
        await idbClear(STORES.tasks);
        for (const t of tasks) {
          await idbPut(STORES.tasks, t);
        }
      } catch {}
    },

    isOnline(): boolean {
      return _isOnline;
    },

    async reset(): Promise<void> {
      // Clear all IndexedDB stores and re-seed demo data
      for (const storeName of Object.values(STORES)) {
        await idbClear(storeName).catch(() => {});
      }
      await seedDemoData();
    },
  };
}

// ─── Singleton instance ───
let _instance: DataService | null = null;

export function getDataService(): DataService {
  if (!_instance) {
    _instance = createDataService();
  }
  return _instance;
}
