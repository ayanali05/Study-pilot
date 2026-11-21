'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';

export function StudyHeatmap() {
  const { userStats } = useStore();
  const dailyMap = userStats.dailyStudyMap;

  // Generate last 14 weeks (98 days) for optimal responsive width
  const weeks = 14;
  const daysTotal = weeks * 7;
  const days: Array<{ dateStr: string; minutes: number; level: number }> = [];

  const today = new Date('2024-10-27');
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

  const levelClasses: Record<number, string> = {
    0: 'bg-white/5 border border-white/5',
    1: 'bg-indigo-950/80 border border-indigo-800/40',
    2: 'bg-indigo-800/90 border border-indigo-700/50',
    3: 'bg-indigo-600 border border-indigo-500/60',
    4: 'bg-indigo-400 border border-indigo-300',
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 w-full max-w-full overflow-hidden border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-white">
            Daily Study Telemetry Heatmap
          </h3>
          <p className="text-[11px] text-slate-400">
            Recorded via in-app Pomodoro sessions, lecture player, and quick logs.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div key={lvl} className={`w-2.5 h-2.5 rounded-sm ${levelClasses[lvl]}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Grid container with strict responsive bounds */}
      <div className="w-full max-w-full overflow-x-auto pb-1">
        <div className="grid grid-flow-col grid-rows-7 gap-1 sm:gap-1.5 min-w-[320px] max-w-full">
          {days.map((day) => (
            <div
              key={day.dateStr}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm transition-transform hover:scale-125 cursor-pointer ${levelClasses[day.level]}`}
              title={`${day.dateStr}: ${day.minutes} min studied`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <div>
          Current Streak: <strong className="text-orange-400 font-bold">{userStats.currentStreak} days</strong>
        </div>
        <div>
          Longest: <strong className="text-white font-bold">{userStats.longestStreak} days</strong>
        </div>
        <div>
          Total Time: <strong className="text-indigo-400 font-bold">{(userStats.totalStudyMinutes / 60).toFixed(1)} hrs</strong>
        </div>
      </div>
    </div>
  );
}
