'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { SampleDataBadge } from '../../components/SampleDataBadge';
import { generateStudyPlan } from '@studytrack/engine';
import { Calendar, Clock, Download, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

export default function PlanPage() {
  const { syllabus, progress, priorities } = useStore();
  const [examDate, setExamDate] = useState('2024-12-15');
  const [dailyHours, setDailyHours] = useState(3);

  const plan = useMemo(() => {
    return generateStudyPlan(
      syllabus.subjects,
      progress,
      priorities,
      examDate,
      dailyHours,
      '2024-11-20',
    );
  }, [syllabus, progress, priorities, examDate, dailyHours]);

  const handleExportICS = () => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//StudyTrack//AKTU Exam Plan//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n`;

    for (const day of plan.days) {
      for (const topic of day.topics) {
        const dateStr = day.date.replace(/-/g, '');
        icsContent += `BEGIN:VEVENT\nSUMMARY:StudyTrack: ${topic.topicName}\nDESCRIPTION:Priority: ${topic.priority.toUpperCase()} - Estimated duration: ${topic.estimatedMinutes} min\nDTSTART;VALUE=DATE:${dateStr}\nDTEND;VALUE=DATE:${dateStr}\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
      }
    }
    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `StudyTrack_AKTU_Exam_Plan.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Exam Countdown & Auto Study Plan
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Engine automatically allocates remaining topics into a day-by-day plan: <strong>Critical → Important → Optional</strong> with scheduled review slots.
          </p>
        </div>

        <button
          onClick={handleExportICS}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export to Calendar (.ics)</span>
        </button>
      </div>

      {/* Inputs Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Exam Start Date:
          </label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Daily Study Capacity:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={dailyHours}
              onChange={(e) => setDailyHours(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 shrink-0">
              {dailyHours}h / day
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-xs">
          <div>
            <div className="text-slate-500">Days to Exam:</div>
            <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
              {plan.totalDays} Days
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-500">Remaining Critical:</div>
            <div className="text-lg font-extrabold text-rose-600 dark:text-rose-400">
              {plan.uncoveredCritical} Topics
            </div>
          </div>
        </div>
      </div>

      {/* Plan Timeline Grid */}
      <div className="space-y-4">
        {plan.days.slice(0, 14).map((day) => (
          <div
            key={day.date}
            className={`p-5 rounded-2xl border transition-all ${
              day.isReviewDay
                ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-indigo-600 text-white">
                  Day {day.dayNumber}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {day.date}
                </span>
                {day.isReviewDay && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    Spaced Repetition Review Day
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {day.totalMinutes} min scheduled
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {day.topics.length > 0 ? (
                day.topics.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          t.priority === 'critical'
                            ? 'bg-rose-500/15 text-rose-600'
                            : t.priority === 'important'
                            ? 'bg-amber-500/15 text-amber-600'
                            : 'bg-emerald-500/15 text-emerald-600'
                        }`}
                      >
                        {t.priority}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {t.topicName}
                      </span>
                      {t.type === 'review' && (
                        <span className="text-[10px] text-slate-400 italic">(Review slot)</span>
                      )}
                    </div>
                    <span className="text-slate-500 font-mono">{t.estimatedMinutes} min</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 italic p-2">
                  No new topics scheduled. Rest or buffer day.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
