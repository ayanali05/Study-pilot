'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  syllabusData,
  pyqDataSets,
  demoProgress,
  demoSessions,
  demoTestResults,
  demoUserStats,
  demoFlashcards,
  demoBookmarks,
  demoTodoTasks,
  DEMO_USER,
  type Syllabus,
  type SubjectProgress,
  type StudySession,
  type TestResult,
  type UserStats,
  type Flashcard,
  type Bookmark,
  type PYQData,
  type TodoTask,
} from '@studytrack/data';
import {
  analyzePYQ,
  predictSGPA,
  runMonteCarlo,
  getStudyRecommendations,
  type TopicPriorityResult,
  type SGPAPrediction,
  type MonteCarloResult,
  type StudyRecommendation,
} from '@studytrack/engine';

export type JudgeScenario = 'default' | 'smart' | 'skipped_critical' | 'panic' | 'mode_b' | 'calendar';

interface StoreContextType {
  syllabus: Syllabus;
  pyqData: PYQData[];
  progress: SubjectProgress[];
  sessions: StudySession[];
  testResults: TestResult[];
  userStats: UserStats;
  flashcards: Flashcard[];
  bookmarks: Bookmark[];
  todoTasks: TodoTask[];
  priorities: Map<string, TopicPriorityResult[]>;
  prediction: SGPAPrediction;
  monteCarlo: MonteCarloResult;
  recommendations: StudyRecommendation[];
  activeScenario: JudgeScenario;
  isJudgeModalOpen: boolean;
  isTourOpen: boolean;
  tourStep: number;
  openJudgeModal: () => void;
  closeJudgeModal: () => void;
  openTour: () => void;
  closeTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  setScenario: (scenario: JudgeScenario) => void;
  toggleTopicCovered: (subjectId: string, topicId: string) => void;
  updateConfidence: (subjectId: string, confidence: number) => void;
  updateInternalMarks: (subjectId: string, marks: number) => void;
  updateUserStats: (stats: Partial<UserStats>) => void;
  resetDemoData: () => void;
  addSession: (session: StudySession) => void;
  addTestResult: (result: TestResult) => void;
  updateFlashcardReview: (flashcard: Flashcard) => void;
  addTodoTask: (task: TodoTask) => void;
  toggleTodoTask: (id: string) => void;
  deleteTodoTask: (id: string) => void;
  // Tunable PYQ Weights
  pyqWeights: { frequency: number; marks: number; recency: number; gap: number };
  setPyqWeights: (weights: { frequency: number; marks: number; recency: number; gap: number }) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [syllabus] = useState<Syllabus>(syllabusData);
  const [pyqData] = useState<PYQData[]>(pyqDataSets);
  const [progress, setProgress] = useState<SubjectProgress[]>(demoProgress);
  const [sessions, setSessions] = useState<StudySession[]>(demoSessions);
  const [testResults, setTestResults] = useState<TestResult[]>(demoTestResults);
  const [userStats, setUserStats] = useState<UserStats>(demoUserStats);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(demoFlashcards);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(demoBookmarks);
  const [todoTasks, setTodoTasks] = useState<TodoTask[]>(demoTodoTasks);

  const [activeScenario, setActiveScenarioState] = useState<JudgeScenario>('default');
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const [pyqWeights, setPyqWeights] = useState({
    frequency: 0.35,
    marks: 0.25,
    recency: 0.25,
    gap: 0.15,
  });

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('studytrack_progress');
      if (savedProgress) setProgress(JSON.parse(savedProgress));

      const savedStats = localStorage.getItem('studytrack_stats');
      if (savedStats) setUserStats(JSON.parse(savedStats));

      const savedSessions = localStorage.getItem('studytrack_sessions');
      if (savedSessions) setSessions(JSON.parse(savedSessions));

      const savedScenario = localStorage.getItem('studytrack_scenario') as JudgeScenario;
      if (savedScenario) setActiveScenarioState(savedScenario);

      const savedTasks = localStorage.getItem('studytrack_tasks');
      if (savedTasks) setTodoTasks(JSON.parse(savedTasks));
    } catch (e) {
      console.warn('Could not load local state:', e);
    }
  }, []);

  // Save changes
  const saveProgress = useCallback((newProgress: SubjectProgress[]) => {
    setProgress(newProgress);
    try {
      localStorage.setItem('studytrack_progress', JSON.stringify(newProgress));
    } catch {}
  }, []);

  // ── Compute Priorities ──
  const priorities = useMemo(() => {
    const map = new Map<string, TopicPriorityResult[]>();
    for (const subject of syllabus.subjects) {
      const pyq = pyqData.find((p) => p.subjectId === subject.id);
      if (pyq) {
        const topics = subject.units.flatMap((u) => u.topics);
        map.set(
          subject.id,
          analyzePYQ(pyq, topics, {
            frequencyWeight: pyqWeights.frequency,
            marksWeight: pyqWeights.marks,
            recencyWeight: pyqWeights.recency,
            gapSignalWeight: pyqWeights.gap,
          }),
        );
      }
    }
    return map;
  }, [syllabus, pyqData, pyqWeights]);

  // ── Compute SGPA Prediction ──
  const prediction = useMemo(() => {
    return predictSGPA(syllabus.subjects, progress, priorities, testResults);
  }, [syllabus, progress, priorities, testResults]);

  // ── Compute Monte Carlo Simulation ──
  const monteCarlo = useMemo(() => {
    return runMonteCarlo(prediction, 5000, 42);
  }, [prediction]);

  // ── Compute Study Recommendations ──
  const recommendations = useMemo(() => {
    return getStudyRecommendations(syllabus.subjects, progress, priorities, testResults, 12);
  }, [syllabus, progress, priorities, testResults]);

  // ── Topic Toggle ──
  const toggleTopicCovered = useCallback(
    (subjectId: string, topicId: string) => {
      const updated = progress.map((sp) => {
        if (sp.subjectId !== subjectId) return sp;
        const exists = sp.topics.find((t) => t.topicId === topicId);
        let updatedTopics;
        if (exists) {
          updatedTopics = sp.topics.map((t) =>
            t.topicId === topicId
              ? { ...t, covered: !t.covered, coveredAt: !t.covered ? new Date().toISOString() : undefined }
              : t,
          );
        } else {
          updatedTopics = [
            ...sp.topics,
            { topicId, subjectId, covered: true, coveredAt: new Date().toISOString(), timeSpent: 30, resources: [] },
          ];
        }
        return { ...sp, topics: updatedTopics };
      });

      saveProgress(updated);

      // Award XP
      setUserStats((prev) => {
        const nextXp = prev.xp + 20;
        const nextStats = { ...prev, xp: nextXp };
        try {
          localStorage.setItem('studytrack_stats', JSON.stringify(nextStats));
        } catch {}
        return nextStats;
      });
    },
    [progress, saveProgress],
  );

  const updateConfidence = useCallback(
    (subjectId: string, confidence: number) => {
      const updated = progress.map((sp) =>
        sp.subjectId === subjectId ? { ...sp, confidence } : sp,
      );
      saveProgress(updated);
    },
    [progress, saveProgress],
  );

  const updateInternalMarks = useCallback(
    (subjectId: string, internalMarks: number) => {
      const updated = progress.map((sp) =>
        sp.subjectId === subjectId ? { ...sp, internalMarks } : sp,
      );
      saveProgress(updated);
    },
    [progress, saveProgress],
  );

  // ── Scenarios for Judge Mode ──
  const setScenario = useCallback(
    (scenario: JudgeScenario) => {
      setActiveScenarioState(scenario);
      localStorage.setItem('studytrack_scenario', scenario);

      if (scenario === 'default') {
        saveProgress(demoProgress);
        return;
      }

      if (scenario === 'smart') {
        // "Smart Student": Studied ONLY Critical & high-yield topics (~45% syllabus), but high confidence
        const smartProgress: SubjectProgress[] = syllabus.subjects.map((s) => {
          const subjectPriorities = priorities.get(s.id) ?? [];
          const criticalIds = new Set(
            subjectPriorities.filter((p) => p.bucket === 'Critical').map((p) => p.topicId),
          );
          return {
            subjectId: s.id,
            confidence: 5,
            internalMarks: 27,
            topics: s.units.flatMap((u) => u.topics).map((t) => ({
              topicId: t.id,
              subjectId: s.id,
              covered: criticalIds.has(t.id),
              confidence: criticalIds.has(t.id) ? 5 : undefined,
              timeSpent: criticalIds.has(t.id) ? 90 : 0,
              resources: [],
            })),
          };
        });
        saveProgress(smartProgress);
        return;
      }

      if (scenario === 'skipped_critical') {
        // "Unfocused Student": Studied 70% of topics, but SKIPPED the Critical PYQ topics!
        const skippedProgress: SubjectProgress[] = syllabus.subjects.map((s) => {
          const subjectPriorities = priorities.get(s.id) ?? [];
          const criticalIds = new Set(
            subjectPriorities.filter((p) => p.bucket === 'Critical').map((p) => p.topicId),
          );
          return {
            subjectId: s.id,
            confidence: 3,
            internalMarks: 20,
            topics: s.units.flatMap((u) => u.topics).map((t) => ({
              topicId: t.id,
              subjectId: s.id,
              // Covered if NOT critical!
              covered: !criticalIds.has(t.id),
              confidence: !criticalIds.has(t.id) ? 3 : undefined,
              timeSpent: !criticalIds.has(t.id) ? 45 : 0,
              resources: [],
            })),
          };
        });
        saveProgress(skippedProgress);
        return;
      }

      if (scenario === 'panic') {
        // "Panic Student": 20% coverage, low confidence, upcoming exam
        const panicProgress: SubjectProgress[] = syllabus.subjects.map((s) => ({
          subjectId: s.id,
          confidence: 2,
          internalMarks: 16,
          topics: s.units.flatMap((u) => u.topics).slice(0, 2).map((t) => ({
            topicId: t.id,
            subjectId: s.id,
            covered: true,
            confidence: 2,
            timeSpent: 30,
            resources: [],
          })),
        }));
        saveProgress(panicProgress);
      }
    },
    [syllabus, priorities, saveProgress],
  );

  const addTodoTask = useCallback((task: TodoTask) => {
    setTodoTasks((prev) => {
      const next = [task, ...prev];
      try { localStorage.setItem('studytrack_tasks', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const toggleTodoTask = useCallback((id: string) => {
    setTodoTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      try { localStorage.setItem('studytrack_tasks', JSON.stringify(next)); } catch {}
      return next;
    });
    // Award XP
    setUserStats((prev) => {
      const next = { ...prev, xp: prev.xp + 20 };
      try { localStorage.setItem('studytrack_stats', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const deleteTodoTask = useCallback((id: string) => {
    setTodoTasks((prev) => {
      const next = prev.filter((t) => t.id !== id);
      try { localStorage.setItem('studytrack_tasks', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const updateUserStats = useCallback((updates: Partial<UserStats>) => {
    setUserStats((prev) => {
      const next = { ...prev, ...updates };
      try { localStorage.setItem('studytrack_stats', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // ── Reset Demo ──
  const resetDemoData = useCallback(() => {
    localStorage.removeItem('studytrack_progress');
    localStorage.removeItem('studytrack_stats');
    localStorage.removeItem('studytrack_sessions');
    localStorage.removeItem('studytrack_scenario');
    localStorage.removeItem('studytrack_tasks');
    setProgress(demoProgress);
    setUserStats(demoUserStats);
    setSessions(demoSessions);
    setTestResults(demoTestResults);
    setFlashcards(demoFlashcards);
    setBookmarks(demoBookmarks);
    setTodoTasks(demoTodoTasks);
    setActiveScenarioState('default');
  }, []);

  const addSession = useCallback((newSession: StudySession) => {
    setSessions((prev) => [newSession, ...prev]);
  }, []);

  const addTestResult = useCallback((res: TestResult) => {
    setTestResults((prev) => [res, ...prev]);
  }, []);

  const updateFlashcardReview = useCallback((fc: Flashcard) => {
    setFlashcards((prev) => prev.map((f) => (f.id === fc.id ? fc : f)));
  }, []);

  return (
    <StoreContext.Provider
      value={{
        syllabus,
        pyqData,
        progress,
        sessions,
        testResults,
        userStats,
        flashcards,
        bookmarks,
        todoTasks,
        priorities,
        prediction,
        monteCarlo,
        recommendations,
        activeScenario,
        isJudgeModalOpen,
        isTourOpen,
        tourStep,
        openJudgeModal: () => setIsJudgeModalOpen(true),
        closeJudgeModal: () => setIsJudgeModalOpen(false),
        openTour: () => {
          setTourStep(0);
          setIsTourOpen(true);
        },
        closeTour: () => setIsTourOpen(false),
        nextTourStep: () => setTourStep((s) => Math.min(s + 1, 5)),
        prevTourStep: () => setTourStep((s) => Math.max(s - 1, 0)),
        setScenario,
        toggleTopicCovered,
        updateConfidence,
        updateInternalMarks,
        updateUserStats,
        resetDemoData,
        addSession,
        addTestResult,
        updateFlashcardReview,
        addTodoTask,
        toggleTodoTask,
        deleteTodoTask,
        pyqWeights,
        setPyqWeights,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
