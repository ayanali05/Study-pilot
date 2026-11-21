'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Target,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  Radio,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useI18n } from '../context/I18nContext';
import { DualProgressBar } from '../components/DualProgressBar';
import { StudyHeatmap } from '../components/StudyHeatmap';
import { EstimateBadge, SampleDataBadge } from '../components/SampleDataBadge';

export default function DashboardPage() {
  const { prediction, syllabus, progress, userStats, recommendations, activeScenario } = useStore();
  const { t } = useI18n();

  // Calculate overall plain coverage vs priority-weighted coverage across all subjects
  const totalTopics = syllabus.subjects.reduce(
    (sum, s) => sum + s.units.reduce((uSum, u) => uSum + u.topics.length, 0),
    0,
  );
  const coveredTopicsCount = progress.reduce(
    (sum, sp) => sum + sp.topics.filter((t) => t.covered).length,
    0,
  );
  const plainCoveragePercent = totalTopics > 0 ? (coveredTopicsCount / totalTopics) * 100 : 0;

  const avgPriorityCoverage =
    prediction.subjects.reduce((sum, s) => sum + s.priorityWeightedCoverage, 0) /
    (prediction.subjects.length || 1) *
    100;

  return (
    <div className="space-y-6">
      {/* Realtime Extension Sync Indicator Banner */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-700 dark:text-indigo-300">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold">Realtime Telemetry Active:</span>
          <span>Chrome Extension syncs YouTube & web study sessions automatically.</span>
        </div>
        <div className="flex items-center gap-3">
          <SampleDataBadge />
        </div>
      </div>

      {/* Hero Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Hero Predicted SGPA */}
        <Link
          href="/predictor"
          className="group p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-100 uppercase tracking-wider">
              {t('predictedSgpa')}
            </span>
            <Target className="w-4 h-4 text-indigo-200" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight">
              {prediction.sgpa.toFixed(2)}
            </span>
            <span className="text-xs text-indigo-200 font-medium">/ 10.0</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-indigo-100/90 border-t border-indigo-500/60 pt-2">
            <span>Range: {(prediction.sgpa - 0.4).toFixed(1)} – {(prediction.sgpa + 0.3).toFixed(1)}</span>
            <span className="group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
              Monte Carlo <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Card 2: Priority Syllabus Covered (The Insight) */}
        <Link
          href="/roadmap"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('priorityCoverage')}
            </span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {avgPriorityCoverage.toFixed(0)}%
            </span>
            <span className="text-xs text-slate-400">vs {plainCoveragePercent.toFixed(0)}% plain</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
            <span>Gap: {(avgPriorityCoverage - plainCoveragePercent) > 0 ? '+' : ''}{(avgPriorityCoverage - plainCoveragePercent).toFixed(0)}%</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">High-yield focus</span>
          </div>
        </Link>

        {/* Card 3: Study Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('dayStreak')}
            </span>
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {userStats.currentStreak}
            </span>
            <span className="text-xs text-slate-400">days active</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
            <span>Best: {userStats.longestStreak} days</span>
            <span className="text-orange-500 font-semibold">+10 XP daily</span>
          </div>
        </div>

        {/* Card 4: Study Telemetry Hours */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('totalStudyHours')}
            </span>
            <Clock className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {(userStats.totalStudyMinutes / 60).toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">hours tracked</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 flex items-center justify-between">
            <span>{userStats.totalSessionsCount} sessions</span>
            <span className="text-emerald-500 font-semibold">{userStats.xp} XP</span>
          </div>
        </div>
      </div>

      {/* GitHub Study Activity Heatmap */}
      <StudyHeatmap />

      {/* Core Split: Subject Progress vs High-Impact Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Subject-wise Dual Progress Bars */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Semester 3 Subjects — Plain vs Priority Coverage
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The gap between the gray bar and indigo bar indicates whether you studied high-yield exam material.
              </p>
            </div>
            <Link
              href="/roadmap"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {prediction.subjects.map((sub) => (
              <div
                key={sub.subjectId}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {sub.subjectName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ({sub.credits} credits)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Predicted Grade:</span>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {sub.predictedGrade} ({sub.predictedTotal}/100)
                    </span>
                  </div>
                </div>

                <DualProgressBar
                  plainPercentage={sub.plainCoverage * 100}
                  priorityPercentage={sub.priorityWeightedCoverage * 100}
                  showLabels={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Top "Study Next" Recommendations */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Study Next
                </h3>
              </div>
              <Link
                href="/recommendations"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 my-3">
              Uncovered topics ranked by marginal SGPA gain per study hour:
            </p>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec) => (
                <div
                  key={rec.topicId}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {rec.topicName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
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
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{rec.subjectName}</span>
                    <span>~{rec.estimatedHours}h est.</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-1.5 rounded border border-slate-100 dark:border-slate-800">
                    {rec.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/what-if"
            className="w-full mt-4 py-2.5 px-4 text-xs font-bold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800 text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Simulate SGPA Gains in What-If</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
