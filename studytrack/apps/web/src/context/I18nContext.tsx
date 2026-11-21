'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface I18nContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    roadmap: 'Syllabus Roadmap',
    pyq: 'PYQ Intelligence',
    predictor: 'SGPA Predictor',
    whatIf: 'What-If Simulator',
    recommendations: 'Study Next',
    tests: 'Test Generator',
    flashcards: 'Flashcards (SM-2)',
    plan: 'Exam Countdown',
    coach: 'AI Study Coach',
    report: 'Report Card',
    predictedSgpa: 'Predicted SGPA',
    priorityCoverage: 'Priority Syllabus Covered',
    dayStreak: 'Day Streak',
    totalStudyHours: 'Total Study Time',
    sampleDataNote: 'Sample dataset — not official AKTU data',
    estimateNote: 'Estimate, not a guarantee.',
    resetDemo: 'Reset Demo',
    judgeMode: 'Judge Mode',
    guidedTour: 'Guided Tour',
    searchPlaceholder: 'Search topics, subjects, PYQs (Ctrl+K)...',
    smartStudent: 'Smart Strategy (Critical PYQs first)',
    scatteredStudent: 'Unfocused Study (Skipped Critical)',
    examPanic: 'Exam Week Panic',
    activeScenarios: 'Scenario Switcher',
    theInsight: 'The Insight: Coverage vs Priority Gap',
    highImpactNext: 'What to study next for maximum SGPA gain',
    viewDetails: 'View Details',
    covered: 'Covered',
    uncovered: 'Uncovered',
    confidence: 'Confidence',
  },
  hi: {
    dashboard: 'Dashboard',
    roadmap: 'Syllabus Roadmap',
    pyq: 'PYQ Intelligence',
    predictor: 'SGPA Predictor',
    whatIf: 'What-If Simulator',
    recommendations: 'Aage Kya Padhein',
    tests: 'Test Generator',
    flashcards: 'Flashcards (SM-2 Revision)',
    plan: 'Exam Plan (Countdown)',
    coach: 'AI Study Coach',
    report: 'Report Card',
    predictedSgpa: 'Predicted SGPA',
    priorityCoverage: 'Zaroori Syllabus Kitna Hua',
    dayStreak: 'Streak (Lagataar Din)',
    totalStudyHours: 'Kul Padhai Ka Samay',
    sampleDataNote: 'Sample dataset — official AKTU data nahi hai',
    estimateNote: 'Estimate hai, guarantee nahi.',
    resetDemo: 'Reset Demo',
    judgeMode: 'Judge Mode (Demo Scenarios)',
    guidedTour: 'Guided Tour',
    searchPlaceholder: 'Topics ya PYQs dhoondhein (Ctrl+K)...',
    smartStudent: 'Smart Padhaaku (Critical PYQs pehle)',
    scatteredStudent: 'Random Padhai (Critical topics chhod diye)',
    examPanic: 'Exam Week Ki Tension',
    activeScenarios: 'Scenario Switcher',
    theInsight: 'Kamaal Ki Baat: Total Syllabus vs Zaroori Syllabus Ka Farak',
    highImpactNext: 'Ye padhoge toh SGPA sabse zyada badhega',
    viewDetails: 'Poora Dekhein',
    covered: 'Kar Liya',
    uncovered: 'Bacha Hai',
    confidence: 'Kitna Bharosa Hai',
  },
};

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  toggleLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('studytrack_lang') as Language;
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    localStorage.setItem('studytrack_lang', next);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
