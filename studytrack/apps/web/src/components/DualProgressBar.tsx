'use client';

import React from 'react';

interface DualProgressBarProps {
  plainPercentage: number;
  priorityPercentage: number;
  subjectName?: string;
  showLabels?: boolean;
  className?: string;
}

export function DualProgressBar({
  plainPercentage,
  priorityPercentage,
  subjectName,
  showLabels = true,
  className = '',
}: DualProgressBarProps) {
  const plain = Math.max(0, Math.min(100, Math.round(plainPercentage)));
  const priority = Math.max(0, Math.min(100, Math.round(priorityPercentage)));
  const gap = priority - plain;

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {subjectName ?? 'Syllabus Progress'}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-slate-400">
              Plain: <strong className="text-slate-700 dark:text-slate-200">{plain}%</strong>
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              Priority: <strong>{priority}%</strong>
            </span>
            {gap !== 0 && (
              <span
                className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                  gap > 0
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                }`}
                title="Gap between plain topic count and exam-priority weighted coverage"
              >
                {gap > 0 ? `+${gap}% High-Yield` : `${gap}% Lagging`}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Progress Bars Container */}
      <div className="space-y-1.5">
        {/* Priority-Weighted Bar (Hero) */}
        <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 rounded-full"
            style={{ width: `${priority}%` }}
          />
        </div>

        {/* Plain Syllabus Bar (Ghost Comparison) */}
        <div className="relative w-full h-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-400 dark:bg-slate-500 transition-all duration-500 rounded-full"
            style={{ width: `${plain}%` }}
          />
        </div>
      </div>
    </div>
  );
}
