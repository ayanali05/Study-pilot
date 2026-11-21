'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Calculator, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function HeroFeaturesBanner() {
  const { prediction } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
      {/* Hero 1: Mode B: Progress-Based Academic Estimator */}
      <Link
        href="/predictor"
        className="group relative p-6 sm:p-7 rounded-3xl glass-card-interactive border border-indigo-500/30 overflow-hidden"
      >
        {/* Ambient neon radial highlight */}
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              Hero Feature 1
            </span>
          </div>

          <span className="text-xs font-mono font-black text-indigo-300 bg-white/10 px-3 py-1 rounded-2xl border border-white/15 shadow-sm backdrop-blur-md">
            {prediction.sgpa.toFixed(2)} SGPA
          </span>
        </div>

        <div className="relative z-10 mt-5 space-y-2">
          <h3 className="text-lg font-black text-white group-hover:text-indigo-200 transition-colors flex items-center gap-2.5 drop-shadow">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform shadow-md shadow-indigo-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            Mode B: Progress-Based Academic Estimator
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            Synthesizes priority-weighted syllabus coverage, confidence ratings, test calibration, and 10,000 Monte Carlo runs with probability target curves and explainable formulas.
          </p>
        </div>

        <div className="relative z-10 mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Launch Mode B Estimator
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </div>
      </Link>

      {/* Hero 2: Personalized Daily Study Calendar */}
      <Link
        href="/plan"
        className="group relative p-6 sm:p-7 rounded-3xl glass-card-interactive border border-emerald-500/30 overflow-hidden"
      >
        {/* Ambient neon radial highlight */}
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-teal-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Hero Feature 2
            </span>
          </div>

          <span className="text-xs font-mono font-black text-emerald-300 bg-white/10 px-3 py-1 rounded-2xl border border-white/15 shadow-sm backdrop-blur-md">
            Exam Roadmap
          </span>
        </div>

        <div className="relative z-10 mt-5 space-y-2">
          <h3 className="text-lg font-black text-white group-hover:text-emerald-200 transition-colors flex items-center gap-2.5 drop-shadow">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform shadow-md shadow-emerald-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            Personalized Daily Study Calendar
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            Day-by-day exam roadmap allocating Critical PYQ topics first, auto-scheduling Spaced Repetition review slots, with live topic checkboxes (+45 XP) and one-click .ics export.
          </p>
        </div>

        <div className="relative z-10 mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Open Daily Study Plan
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
