'use client';

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SampleDataBadge, EstimateBadge } from '../../components/SampleDataBadge';
import { Award, Target, Flame, Clock, Printer, Share2 } from 'lucide-react';

export default function ReportPage() {
  const { prediction, userStats, syllabus, monteCarlo } = useStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Official StudyTrack Report Card
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Printable academic progress report with predicted SGPA and PYQ coverage breakdown.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Certificate Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-indigo-200 dark:border-indigo-900/40 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
              AKTU Semester 3 Academic Assessment
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              DEEPAK PANDEY
            </h2>
            <div className="text-xs text-slate-500 font-medium">
              B.Tech Computer Science & Engineering • Roll No: 2501660100055 • Batch 2025
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Predicted SGPA</div>
            <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
              {prediction.sgpa.toFixed(2)}
            </div>
            <EstimateBadge className="mt-1" />
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
            <div className="text-xs text-slate-500">Study Streak</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {userStats.currentStreak} Days
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
            <div className="text-xs text-slate-500">Total Tracked</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {(userStats.totalStudyMinutes / 60).toFixed(1)} Hours
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
            <div className="text-xs text-slate-500">Confidence Range</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {monteCarlo.percentile10.toFixed(1)} – {monteCarlo.percentile90.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Subjects Performance Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Subject-Wise Credit Breakdown:
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="p-3 font-bold">Subject</th>
                  <th className="p-3 font-bold">Credits</th>
                  <th className="p-3 font-bold">Priority Coverage</th>
                  <th className="p-3 font-bold">Predicted Total</th>
                  <th className="p-3 font-bold text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {prediction.subjects.map((sub) => (
                  <tr key={sub.subjectId}>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      {sub.subjectName}
                    </td>
                    <td className="p-3 font-mono">{sub.credits}</td>
                    <td className="p-3 font-mono">
                      {(sub.priorityWeightedCoverage * 100).toFixed(0)}%
                    </td>
                    <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {sub.predictedTotal}/100
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-extrabold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                        {sub.predictedGrade} ({sub.predictedGradePoints})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Generated by StudyTrack AI Academic Engine</span>
          <span>Verified against AKTU B.Tech Ordinance</span>
        </div>
      </div>
    </div>
  );
}
