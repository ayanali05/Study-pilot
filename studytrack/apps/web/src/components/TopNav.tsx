'use client';

import React from 'react';
import {
  Flame,
  Search,
  RotateCcw,
  SlidersHorizontal,
  Compass,
  Languages,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useI18n } from '../context/I18nContext';
import { useStore } from '../context/StoreContext';
import { SampleDataBadge } from './SampleDataBadge';

export function TopNav() {
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang, t } = useI18n();
  const {
    userStats,
    resetDemoData,
    openJudgeModal,
    openTour,
    activeScenario,
  } = useStore();

  const scenarioLabels: Record<string, string> = {
    default: 'Default Demo',
    smart: 'Smart Student',
    skipped_critical: 'Unfocused (Skipped Critical)',
    panic: 'Panic Mode',
  };

  return (
    <header className="h-16 px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Quick search trigger & sample badge */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            // Trigger keyboard shortcut synthetic event
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{t('searchPlaceholder')}</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700">
            Ctrl+K
          </kbd>
        </button>

        <SampleDataBadge className="hidden md:inline-flex" />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* Streak counter */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20"
          title={`${userStats.currentStreak} day study streak!`}
        >
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span>{userStats.currentStreak}d Streak</span>
        </div>

        {/* Judge Mode Switcher */}
        <button
          onClick={openJudgeModal}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            activeScenario !== 'default'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm shadow-amber-500/30'
              : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
          }`}
          title="Open Judge Mode to compare student scenarios"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Judge Mode:</span>
          <span>{scenarioLabels[activeScenario]}</span>
        </button>

        {/* Guided Tour */}
        <button
          onClick={openTour}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
        >
          <Compass className="w-3.5 h-3.5 text-indigo-500" />
          <span className="hidden md:inline">{t('guidedTour')}</span>
        </button>

        {/* Reset Demo */}
        <button
          onClick={resetDemoData}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          title="Reset all demo data back to clean state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">{t('resetDemo')}</span>
        </button>

        {/* Language Toggle (English <-> Hinglish) */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
          title="Toggle between English and Hinglish"
        >
          <Languages className="w-3.5 h-3.5 text-indigo-500" />
          <span>{lang === 'en' ? 'EN' : 'हिं'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
          title="Toggle Dark / Light theme"
        >
          <Sun className="w-4 h-4 hidden dark:block" />
          <Moon className="w-4 h-4 block dark:hidden" />
        </button>
      </div>
    </header>
  );
}
