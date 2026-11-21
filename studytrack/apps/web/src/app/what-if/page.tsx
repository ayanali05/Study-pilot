'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { SampleDataBadge } from '../../components/SampleDataBadge';
import {
  Sparkles,
  GitCompare,
  ArrowRight,
  CheckCircle2,
  Circle,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { predictSGPA } from '@studytrack/engine';

export default function WhatIfPage() {
  const { syllabus, progress, priorities, testResults, prediction } = useStore();
  const [hypotheticalCovered, setHypotheticalCovered] = useState<Set<string>>(new Set());

  // Real covered topic ids
  const realCoveredIds = useMemo(() => {
    return new Set(
      progress.flatMap((sp) => sp.topics.filter((t) => t.covered).map((t) => t.topicId)),
    );
  }, [progress]);

  // Build hypothetical progress state
  const hypotheticalProgress = useMemo(() => {
    return progress.map((sp) => {
      const subjectTopics = syllabus.subjects
        .find((s) => s.id === sp.subjectId)
        ?.units.flatMap((u) => u.topics) ?? [];

      const updatedTopics = subjectTopics.map((t) => {
        const isCoveredReal = realCoveredIds.has(t.id);
        const isCoveredHypo = hypotheticalCovered.has(t.id);
        return {
          topicId: t.id,
          subjectId: sp.subjectId,
          covered: isCoveredReal || isCoveredHypo,
          confidence: 4,
          timeSpent: 60,
          resources: [],
        };
      });

      return {
        ...sp,
        topics: updatedTopics,
      };
    });
  }, [progress, syllabus, realCoveredIds, hypotheticalCovered]);

  // Recalculate hypothetical prediction
  const hypotheticalPrediction = useMemo(() => {
    return predictSGPA(syllabus.subjects, hypotheticalProgress, priorities, testResults);
  }, [syllabus, hypotheticalProgress, priorities, testResults]);

  const sgpaDelta = hypotheticalPrediction.sgpa - prediction.sgpa;

  const toggleHypotheticalTopic = (topicId: string) => {
    setHypotheticalCovered((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  const clearHypothetical = () => {
    setHypotheticalCovered(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              What-If Simulator (Zero-Risk Simulation)
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Tick hypothetical topics to see live animated SGPA & grade gains without touching your real study progress.
          </p>
        </div>

        {hypotheticalCovered.size > 0 && (
          <button
            onClick={clearHypothetical}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Simulation ({hypotheticalCovered.size} topics)</span>
          </button>
        )}
      </div>

      {/* Comparison Scoreboard Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Current Real SGPA */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-slate-500">Current Real SGPA</div>
          <div className="text-3xl font-extrabold text-slate-700 dark:text-slate-300">
            {prediction.sgpa.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-400">Based on topics actually marked covered</p>
        </div>

        {/* Hypothetical SGPA */}
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Simulated SGPA
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {hypotheticalPrediction.sgpa.toFixed(2)}
          </div>
          <p className="text-[11px] text-indigo-600/80">
            With +{hypotheticalCovered.size} hypothetical topics
          </p>
        </div>

        {/* Animated Delta */}
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
          <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Marginal Gain Delta
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {sgpaDelta > 0 ? `+${sgpaDelta.toFixed(2)}` : '0.00'}
          </div>
          <p className="text-[11px] text-emerald-600/80">
            {sgpaDelta > 0 ? 'Projected SGPA increase' : 'Tick topics below to simulate gains'}
          </p>
        </div>
      </div>

      {/* Uncovered Topics Checklist to Simulate */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Select Topics to Test (High-Yield Critical Topics First):
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Topics already covered in reality are disabled. Check any remaining topic to see how much it raises your SGPA.
          </p>
        </div>

        <div className="space-y-4">
          {syllabus.subjects.map((sub) => {
            const subjectPriorities = priorities.get(sub.id) ?? [];
            const priorityMap = new Map(subjectPriorities.map((p) => [p.topicId, p]));
            const subTopics = sub.units.flatMap((u) => u.topics);

            return (
              <div key={sub.id} className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {sub.name} ({sub.credits} Credits)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {subTopics.map((topic) => {
                    const isRealCovered = realCoveredIds.has(topic.id);
                    const isHypo = hypotheticalCovered.has(topic.id);
                    const prio = priorityMap.get(topic.id);
                    const bucket = prio?.bucket ?? 'Optional';

                    return (
                      <div
                        key={topic.id}
                        onClick={() => {
                          if (!isRealCovered) toggleHypotheticalTopic(topic.id);
                        }}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isRealCovered
                            ? 'bg-slate-100/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed'
                            : isHypo
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isRealCovered ? (
                            <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                          ) : isHypo ? (
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                          )}
                          <span className="font-semibold truncate">{topic.name}</span>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            bucket === 'Critical'
                              ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                              : bucket === 'Important'
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                              : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {bucket}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
