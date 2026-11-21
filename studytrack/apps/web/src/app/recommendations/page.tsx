'use client';

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SampleDataBadge } from '../../components/SampleDataBadge';
import { Sparkles, Clock, Target, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function RecommendationsPage() {
  const { recommendations, toggleTopicCovered } = useStore();

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              &ldquo;Study Next&rdquo; Priority Recommender
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ranks uncovered topics by <strong>marginal SGPA gain per estimated study hour</strong>.
          </p>
        </div>

        <Link
          href="/plan"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span>Auto-Generate Exam Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Recommendation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => (
          <div
            key={rec.topicId}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  Rank #{idx + 1} Recommendation
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    rec.bucket === 'Critical'
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      : rec.bucket === 'Important'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {rec.bucket}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {rec.topicName}
              </h3>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{rec.subjectName}</span>
                <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5" />
                  ~{rec.estimatedHours}h estimated
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                {rec.reason}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <Link
                href={`/pyq?subject=${rec.subjectId}&topic=${rec.topicId}`}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View PYQ Qs →
              </Link>

              <button
                onClick={() => {
                  toggleTopicCovered(rec.subjectId, rec.topicId);
                  alert(`"${rec.topicName}" marked as studied! SGPA recalculated.`);
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Mark Studied
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
