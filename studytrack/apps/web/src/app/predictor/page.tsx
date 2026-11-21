'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MonteCarloChart } from '../../components/MonteCarloChart';
import { CalculationPanel } from '../../components/CalculationPanel';
import { SampleDataBadge, EstimateBadge } from '../../components/SampleDataBadge';
import {
  Calculator,
  Target,
  TrendingUp,
  Sparkles,
  Zap,
  Sliders,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function PredictorPage() {
  const { prediction, monteCarlo, updateInternalMarks, updateConfidence } = useStore();
  const [activeTab, setActiveTab] = useState<'montecarlo' | 'calculation' | 'sensitivity'>('montecarlo');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              AKTU SGPA Predictor Engine (Hero Feature)
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Driven by actual topics covered + 5-year PYQ repeat probability + test accuracy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/what-if"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch What-If Simulator</span>
          </Link>
        </div>
      </div>

      {/* Hero Prediction Display Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl shadow-indigo-950/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                Official AKTU Ordinance Model
              </span>
              <EstimateBadge className="bg-white/10 text-indigo-100 border-white/20" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black tracking-tight">
                {prediction.sgpa.toFixed(2)}
              </span>
              <span className="text-lg text-indigo-200 font-medium">/ 10.0 SGPA</span>
            </div>
            <p className="text-xs text-indigo-200/90 max-w-lg">
              Estimated Semester 3 performance across {prediction.totalCredits} credits.
              Simulation predicts 80% confidence interval of{' '}
              <strong className="text-white">
                {monteCarlo.percentile10.toFixed(2)} – {monteCarlo.percentile90.toFixed(2)}
              </strong>.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-[11px] text-indigo-200">Expected Grade</div>
              <div className="text-xl font-bold text-white mt-0.5">
                {prediction.sgpa >= 9.0 ? 'O (Outstanding)' : prediction.sgpa >= 8.0 ? 'A+ (Excellent)' : prediction.sgpa >= 7.0 ? 'A (Very Good)' : 'B+ (Good)'}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-[11px] text-indigo-200">Monte Carlo Median</div>
              <div className="text-xl font-bold text-white mt-0.5">
                {monteCarlo.median.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('montecarlo')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'montecarlo'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Monte Carlo Simulation (10,000 Runs)
        </button>
        <button
          onClick={() => setActiveTab('calculation')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'calculation'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Formula Calculation Panel (Explainable)
        </button>
        <button
          onClick={() => setActiveTab('sensitivity')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTab === 'sensitivity'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Subject Sensitivity & Tuning
        </button>
      </div>

      {/* Tab 1: Monte Carlo */}
      {activeTab === 'montecarlo' && <MonteCarloChart />}

      {/* Tab 2: Formula Calculation */}
      {activeTab === 'calculation' && <CalculationPanel />}

      {/* Tab 3: Sensitivity & Tuning */}
      {activeTab === 'sensitivity' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Subject Sensitivity Analysis & Live Internal Marks Tuner
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Adjust your expected internal marks (/30) and confidence (1–5) to see the immediate impact on your final SGPA.
            </p>
          </div>

          <div className="space-y-4">
            {prediction.subjects.map((sub) => (
              <div
                key={sub.subjectId}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="min-w-[200px]">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {sub.subjectName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {sub.credits} Credits • Predicted Total: {sub.predictedTotal}/100 ({sub.predictedGrade})
                  </div>
                </div>

                {/* Internal Marks Slider */}
                <div className="flex-1 max-w-xs space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Internal Marks:</span>
                    <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      {sub.internalMarks} / 30
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="1"
                    value={sub.internalMarks}
                    onChange={(e) =>
                      updateInternalMarks(sub.subjectId, parseInt(e.target.value))
                    }
                    className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Marginal Impact Tag */}
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold px-2 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    +{(sub.credits * 0.06).toFixed(2)} SGPA per grade jump
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
