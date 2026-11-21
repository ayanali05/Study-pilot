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
    skipped_critical: 'Unfocused',
    panic: 'Panic Mode',
    mode_b: 'Mode B Demo',
    calendar: 'Calendar Demo',
  };

  return (
    <header className="h-16 px-4 sm:px-6 glass-panel border-b border-white/10 flex items-center justify-between sticky top-0 z-30 w-full max-w-full">
      {/* Left: Quick search trigger & sample badge */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search features, topics...</span>
          <span className="sm:hidden">Search...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-black/40 rounded border border-white/10 text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        <SampleDataBadge className="hidden xl:inline-flex" />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Streak counter */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20"
          title={`${userStats.currentStreak} day study streak!`}
        >
          <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
          <span>{userStats.currentStreak}d</span>
        </div>

        {/* Judge Mode Switcher */}
        <button
          onClick={openJudgeModal}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
            activeScenario !== 'default'
              ? 'bg-amber-500 text-white border-amber-400 shadow-lg shadow-amber-500/30'
              : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
          }`}
          title="Open Judge Mode to compare student scenarios"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Judge Mode:</span>
          <span>{scenarioLabels[activeScenario] ?? 'Scenario'}</span>
        </button>

        {/* Guided Tour */}
        <button
          onClick={openTour}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl text-slate-200 bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
        >
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Tour</span>
        </button>

        {/* Reset Demo */}
        <button
          onClick={() => {
            resetDemoData();
            alert('Demo data successfully reset to clean pre-loaded state!');
          }}
          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          title="Reset all demo data back to clean state"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 transition-colors"
          title="Toggle between English and Hinglish"
        >
          <Languages className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'en' ? 'EN' : 'हिं'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1.5 rounded-xl text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          title="Toggle Theme"
        >
          <Sun className="w-4 h-4 hidden dark:block" />
          <Moon className="w-4 h-4 block dark:hidden" />
        </button>
      </div>
    </header>
  );
}
