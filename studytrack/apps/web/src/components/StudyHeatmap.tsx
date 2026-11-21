'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';

export function StudyHeatmap() {
  const { userStats } = useStore();
  const dailyMap = userStats.dailyStudyMap;

  // Generate last 16 weeks (112 days)
  const weeks = 16;
  const daysTotal = weeks * 7;
  const days: Array<{ dateStr: string; minutes: number; level: number }> = [];

  const today = new Date('2024-10-27'); // anchor to demo timeline
  for (let i = daysTotal - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0]!;
    const minutes = dailyMap[dateStr] ?? 0;

    let level = 0;
    if (minutes > 120) level = 4;
    else if (minutes > 60) level = 3;
    else if (minutes > 30) level = 2;
    else if (minutes > 0) level = 1;

    days.push({ dateStr, minutes, level });
  }

  // Level color classes
  const levelClasses: Record<number, string> = {
    0: 'bg-slate-100 dark:bg-slate-800/80',
    1: 'bg-indigo-200 dark:bg-indigo-950',
    2: 'bg-indigo-300 dark:bg-indigo-800',
    3: 'bg-indigo-500 dark:bg-indigo-600',
    4: 'bg-indigo-700 dark:bg-indigo-400',
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Study Activity (Extension Telemetry)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Recorded passively via StudyTrack Chrome Extension & YouTube tracking.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div key={lvl} className={`w-3 h-3 rounded-sm ${levelClasses[lvl]}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Grid container */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
          {days.map((day) => (
            <div
              key={day.dateStr}
              className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 cursor-pointer ${levelClasses[day.level]}`}
              title={`${day.dateStr}: ${day.minutes} min studied`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <div>
          Current Streak: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{userStats.currentStreak} days</strong>
        </div>
        <div>
          Longest Streak: <strong className="text-slate-700 dark:text-slate-300 font-bold">{userStats.longestStreak} days</strong>
        </div>
        <div>
          Total Hours: <strong className="text-slate-700 dark:text-slate-300 font-bold">{(userStats.totalStudyMinutes / 60).toFixed(1)} hrs</strong>
        </div>
      </div>
    </div>
  );
}
