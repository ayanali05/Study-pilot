'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { DualProgressBar } from '../../components/DualProgressBar';
import { SampleDataBadge } from '../../components/SampleDataBadge';
import {
  CheckCircle2,
  Circle,
  Clock,
  Layers,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Tag,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function RoadmapPage() {
  const { syllabus, progress, priorities, toggleTopicCovered } = useStore();
  const [selectedSubjectId, setSelectedSubjectId] = useState(syllabus.subjects[0]?.id ?? 'ds');
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    'ds-u1': true,
    'ds-u2': true,
    'ds-u4': true,
  });

  const subject = syllabus.subjects.find((s) => s.id === selectedSubjectId)!;
  const subjectProgress = progress.find((p) => p.subjectId === selectedSubjectId);
  const topicPriorities = priorities.get(selectedSubjectId) ?? [];
  const priorityMap = new Map(topicPriorities.map((p) => [p.topicId, p]));

  const coveredSet = new Set(
    (subjectProgress?.topics ?? []).filter((t) => t.covered).map((t) => t.topicId),
  );

  const allTopics = subject.units.flatMap((u) => u.topics);
  const totalTopics = allTopics.length;
  const coveredCount = allTopics.filter((t) => coveredSet.has(t.id)).length;
  const plainPercentage = totalTopics > 0 ? (coveredCount / totalTopics) * 100 : 0;

  // Calculate priority-weighted percentage
  let totalPrio = 0;
  let coveredPrio = 0;
  for (const t of allTopics) {
    const prio = priorityMap.get(t.id)?.priorityScore ?? 0.3;
    totalPrio += prio;
    if (coveredSet.has(t.id)) coveredPrio += prio;
  }
  const priorityPercentage = totalPrio > 0 ? (coveredPrio / totalPrio) * 100 : 0;

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              AKTU Semester 3 Syllabus Roadmap
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Check off topics you have studied. Toggling a topic updates your priority coverage and recalculates your SGPA in real time.
          </p>
        </div>

        <Link
          href="/predictor"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span>View Predicted SGPA</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Subject Tab Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {syllabus.subjects.map((sub) => {
          const isSelected = sub.id === selectedSubjectId;
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {sub.name} ({sub.code})
            </button>
          );
        })}
      </div>

      {/* Subject Dual Progress Bar Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-900 dark:text-white">
              {subject.name}
            </span>
            <span className="text-slate-400 ml-2">
              ({coveredCount}/{totalTopics} topics covered • {subject.credits} Credits)
            </span>
          </div>
          <div className="text-indigo-600 dark:text-indigo-400 font-semibold">
            Priority Weighted Coverage: <strong>{priorityPercentage.toFixed(0)}%</strong>
          </div>
        </div>

        <DualProgressBar
          plainPercentage={plainPercentage}
          priorityPercentage={priorityPercentage}
          showLabels={true}
        />
      </div>

      {/* Units & Topics Accordion */}
      <div className="space-y-4">
        {subject.units.map((unit) => {
          const isExpanded = expandedUnits[unit.id] ?? false;
          const unitTopics = unit.topics;
          const unitCovered = unitTopics.filter((t) => coveredSet.has(t.id)).length;

          return (
            <div
              key={unit.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
            >
              {/* Unit Header */}
              <div
                onClick={() => toggleUnit(unit.id)}
                className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="text-slate-400">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Unit {unit.order}: {unit.name}</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {unitCovered}/{unitTopics.length} topics covered
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {Math.round((unitCovered / unitTopics.length) * 100)}%
                  </span>
                </div>
              </div>

              {/* Topics List */}
              {isExpanded && (
                <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/60">
                  {unitTopics.map((topic) => {
                    const isCovered = coveredSet.has(topic.id);
                    const prio = priorityMap.get(topic.id);
                    const bucket = prio?.bucket ?? 'Optional';

                    return (
                      <div
                        key={topic.id}
                        className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                          isCovered
                            ? 'bg-indigo-50/20 dark:bg-indigo-950/10'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTopicCovered(subject.id, topic.id)}
                            className="mt-0.5 shrink-0 transition-transform active:scale-90"
                            title={isCovered ? 'Mark as uncovered' : 'Mark as covered'}
                          >
                            {isCovered ? (
                              <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-950" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-slate-500" />
                            )}
                          </button>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-sm font-semibold ${
                                  isCovered
                                    ? 'text-slate-900 dark:text-white line-through opacity-80'
                                    : 'text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                {topic.name}
                              </span>

                              {/* Priority Bucket Badge */}
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  bucket === 'Critical'
                                    ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                                    : bucket === 'Important'
                                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                    : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                }`}
                              >
                                {bucket} ({prio?.priorityScore ? (prio.priorityScore * 100).toFixed(0) : 30}% PYQ wt)
                              </span>
                            </div>

                            {/* Meta & Tags */}
                            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                ~{topic.estimatedHours}h study
                              </span>
                              {prio && prio.yearsAppeared > 0 && (
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                  Asked {prio.yearsAppeared}/5 years ({prio.totalQuestions} questions)
                                </span>
                              )}
                              {topic.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Quick action: Practice / PYQ */}
                        <div className="shrink-0 flex items-center gap-2">
                          <Link
                            href={`/pyq?subject=${subject.id}&topic=${topic.id}`}
                            className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            PYQ Questions →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
