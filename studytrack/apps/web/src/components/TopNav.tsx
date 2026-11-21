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
  Sparkles,
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
    <header className="h-16 px-4 sm:px-6 glass-panel rounded-3xl mx-3 sm:mx-6 mt-3 mb-2 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-3xl flex items-center justify-between sticky top-3 z-30 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] transition-all">
      {/* Left: Quick search trigger & sample badge */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
          }}
          className="floating-pill flex items-center gap-2 px-3.5 py-1.5 text-xs text-slate-300 rounded-2xl hover:text-white"
        >
          <Search className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Search features, topics...</span>
          <span className="sm:hidden">Search...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-black/50 rounded-lg border border-white/10 text-slate-400">
            Ctrl+K
          </kbd>
        </button>

        <SampleDataBadge className="hidden xl:inline-flex" />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Streak counter with neon glow */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-2xl bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
          title={`${userStats.currentStreak} day study streak!`}
        >
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
          <span>{userStats.currentStreak}d</span>
        </div>

        {/* Judge Mode Switcher with 3D Float */}
        <button
          onClick={openJudgeModal}
          className={`floating-pill flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-2xl border transition-all ${
            activeScenario !== 'default'
              ? 'floating-pill-active !bg-amber-500 text-white !border-amber-300 shadow-[0_8px_25px_rgba(245,158,11,0.5)]'
              : 'text-slate-200'
          }`}
          title="Open Judge Mode to compare student scenarios"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Judge Mode</span>
          {activeScenario !== 'default' && (
            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-full font-mono">
              {scenarioLabels[activeScenario]}
            </span>
          )}
        </button>

        {/* 60s Tour Button */}
        <button
          onClick={openTour}
          className="floating-pill hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-2xl text-slate-300 hover:text-white"
          title="Start 60-Second Evaluator Tour"
        >
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span>Tour</span>
        </button>

        {/* Language Switcher */}
        <button
          onClick={toggleLang}
          className="floating-pill flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-2xl text-slate-300 hover:text-white"
          title="Switch English / Hinglish"
        >
          <Languages className="w-3.5 h-3.5 text-emerald-400" />
          <span className="uppercase text-[11px] font-mono">{lang}</span>
        </button>

        {/* Reset Demo State Button */}
        <button
          onClick={() => {
            if (confirm('Reset all demo data back to clean state?')) {
              resetDemoData();
            }
          }}
          className="floating-pill p-2 text-slate-400 hover:text-rose-400 rounded-2xl"
          title="Reset Demo to Original Seed"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
