'use client';

import React from 'react';
import { X, CheckCircle2, AlertTriangle, Zap, Target, BookOpen } from 'lucide-react';
import { useStore, type JudgeScenario } from '../context/StoreContext';
import { useI18n } from '../context/I18nContext';

export function JudgeModeModal() {
  const { isJudgeModalOpen, closeJudgeModal, activeScenario, setScenario, prediction } = useStore();
  const { t } = useI18n();

  if (!isJudgeModalOpen) return null;

  const scenarios: Array<{
    id: JudgeScenario;
    title: string;
    description: string;
    badge: string;
    color: string;
    icon: React.ElementType;
    impact: string;
  }> = [
    {
      id: 'default',
      title: 'Balanced Baseline Student',
      description: 'Standard 4-week demo state. ~60% syllabus covered across all subjects, active 8-day streak.',
      badge: 'Realistic Benchmark',
      color: 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40',
      icon: BookOpen,
      impact: 'Base case for exploring features.',
    },
    {
      id: 'smart',
      title: 'Smart Student (Studied Critical PYQs)',
      description: 'Covered ONLY ~45% of total syllabus, but focused 100% on Critical & Important past-year questions.',
      badge: 'High SGPA with 45% effort',
      color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30',
      icon: Target,
      impact: 'Demonstrates how priority-weighted coverage yields high SGPA (~8.5+) despite lower plain topic count.',
    },
    {
      id: 'skipped_critical',
      title: 'Unfocused Student (Skipped Critical Topics)',
      description: 'Covered 70% of total topics by count, but skipped recurring high-marks PYQ topics (e.g. BST, Stacks).',
      badge: 'Lower SGPA with 70% effort',
      color: 'border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/30',
      icon: AlertTriangle,
      impact: 'Demonstrates "The Insight": higher topic % but lower SGPA (~6.5) because exam-relevant topics were missed.',
    },
    {
      id: 'panic',
      title: 'Exam Week Panic (Low Coverage)',
      description: 'Only 20% syllabus covered with low confidence. Shows how "Study Next" and "Exam Plan" salvage SGPA.',
      badge: 'Needs Emergency Plan',
      color: 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30',
      icon: Zap,
      impact: 'Highlights the auto-generated 3-day crash plan and marginal gain recommender.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900 dark:text-white">
                Judge Mode — One-Click Scenarios
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                Evaluation Tool
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instantly toggle between student archetypes to test how the engine recalculates SGPA, recommendations, and plans.
            </p>
          </div>
          <button
            onClick={closeJudgeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Predicted Live Metric Banner */}
        <div className="px-6 py-2.5 bg-indigo-50/70 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-xs">
          <span className="text-slate-600 dark:text-slate-400">
            Currently Active Scenario Predicted SGPA:
          </span>
          <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
            {prediction.sgpa.toFixed(2)} SGPA
          </span>
        </div>

        {/* Scenarios List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isSelected = activeScenario === sc.id;
            return (
              <div
                key={sc.id}
                onClick={() => {
                  setScenario(sc.id);
                  closeJudgeModal();
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${sc.color} ${
                  isSelected
                    ? 'ring-2 ring-indigo-500 shadow-md'
                    : 'hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                      <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {sc.title}
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                            <CheckCircle2 className="w-3.5 h-3.5 fill-indigo-600 text-white" />
                            Active
                          </span>
                        )}
                      </div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mt-1">
                        {sc.badge}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5">
                  {sc.description}
                </p>
                <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 pt-2">
                  <strong className="text-slate-700 dark:text-slate-300">Why judges care:</strong>{' '}
                  {sc.impact}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={closeJudgeModal}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
