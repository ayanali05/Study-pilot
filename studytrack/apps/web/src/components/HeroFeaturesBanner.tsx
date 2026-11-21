'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Calculator, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function HeroFeaturesBanner() {
  const { prediction } = useStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Hero 1: Mode B: Progress-Based Academic Estimator */}
      <Link
        href="/predictor"
        className="group relative p-6 rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-purple-950/50 backdrop-blur-2xl border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/10 hover:border-indigo-400 transition-all hover:scale-[1.01] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Hero Feature 1
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-indigo-400 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10">
            {prediction.sgpa.toFixed(2)} SGPA
          </span>
        </div>

        <div className="relative z-10 mt-4 space-y-2">
          <h3 className="text-lg font-black text-white group-hover:text-indigo-200 transition-colors flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            Mode B: Progress-Based Academic Estimator
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Combines priority-weighted syllabus coverage, confidence ratings, test calibration, and 10,000 Monte Carlo simulations. Complete with probability target slider & transparent calculation panel.
          </p>
        </div>

        <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
          <span>Launch Mode B Estimator</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Hero 2: Personalized Daily Study Calendar */}
      <Link
        href="/plan"
        className="group relative p-6 rounded-3xl bg-gradient-to-br from-emerald-950/70 via-slate-900/80 to-teal-950/50 backdrop-blur-2xl border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/10 hover:border-emerald-400 transition-all hover:scale-[1.01] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Hero Feature 2
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-400 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10">
            Automated Calendar
          </span>
        </div>

        <div className="relative z-10 mt-4 space-y-2">
          <h3 className="text-lg font-black text-white group-hover:text-emerald-200 transition-colors flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            Personalized Daily Study Calendar
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Generates day-by-day exam schedule prioritizing Critical PYQ topics first, auto-scheduling Spaced Repetition review slots, with live To-Do synchronization and one-click .ics export.
          </p>
        </div>

        <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
          <span>Open Daily Study Plan</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
