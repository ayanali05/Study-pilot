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
  BookOpen,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useI18n } from '../context/I18nContext';
import { DualProgressBar } from '../components/DualProgressBar';
import { StudyHeatmap } from '../components/StudyHeatmap';
import { SampleDataBadge } from '../components/SampleDataBadge';
import { InAppStudyTracker } from '../components/InAppStudyTracker';
import { TodoList } from '../components/TodoList';
import { HeroFeaturesBanner } from '../components/HeroFeaturesBanner';

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
    <div className="space-y-6 w-full max-w-full overflow-x-hidden pb-8">
      {/* Realtime Telemetry Status Bar with 3D Glass Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-3xl glass-panel border border-indigo-500/30 text-xs text-indigo-300 shadow-[0_10px_30px_rgba(99,102,241,0.15)]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold text-white tracking-wide">In-App Telemetry Active:</span>
          <span className="hidden sm:inline text-indigo-200/80">
            Realtime session tracking, YouTube lecture logs, and exam countdown active.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SampleDataBadge />
        </div>
      </div>

      {/* Hero Metric Cards Grid (4 columns with 3D Floating Air Physics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 floating-tab-container">
        {/* Card 1: Hero Predicted SGPA */}
        <Link
          href="/predictor"
          className="group p-6 rounded-3xl glass-card-interactive bg-gradient-to-br from-indigo-600/80 via-indigo-700/70 to-purple-800/80 border-indigo-400/50 text-white shadow-[0_15px_35px_rgba(99,102,241,0.35)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-100 uppercase tracking-wider">
              {t('predictedSgpa')}
            </span>
            <div className="p-1.5 rounded-xl bg-white/10 border border-white/20">
              <Target className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-black tracking-tight drop-shadow-md">
              {prediction.sgpa.toFixed(2)}
            </span>
            <span className="text-xs text-indigo-200 font-medium">/ 10.0</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-indigo-100/90 border-t border-white/15 pt-2.5">
            <span>Range: {(prediction.sgpa - 0.4).toFixed(1)} – {(prediction.sgpa + 0.3).toFixed(1)}</span>
            <span className="group-hover:translate-x-1.5 transition-transform flex items-center gap-1 font-bold text-white">
              Mode B <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Card 2: Priority Syllabus Covered */}
        <Link
          href="/roadmap"
          className="group p-6 rounded-3xl glass-card-interactive border-white/10 hover:border-indigo-500/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t('priorityCoverage')}
            </span>
            <div className="p-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-black text-white drop-shadow-sm">
              {avgPriorityCoverage.toFixed(0)}%
            </span>
            <span className="text-xs text-slate-400">vs {plainCoveragePercent.toFixed(0)}% plain</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-white/10 pt-2.5 flex items-center justify-between">
            <span>Gap: {avgPriorityCoverage - plainCoveragePercent > 0 ? '+' : ''}{(avgPriorityCoverage - plainCoveragePercent).toFixed(0)}%</span>
            <span className="font-bold text-indigo-400">High-yield focus</span>
          </div>
        </Link>

        {/* Card 3: Study Streak */}
        <div className="p-6 rounded-3xl glass-card-interactive border-white/10 hover:border-orange-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t('dayStreak')}
            </span>
            <div className="p-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-black text-white drop-shadow-sm">
              {userStats.currentStreak}
            </span>
            <span className="text-xs text-slate-400">days active</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-white/10 pt-2.5 flex items-center justify-between">
            <span>Best: {userStats.longestStreak} days</span>
            <span className="text-orange-400 font-bold">+10 XP daily</span>
          </div>
        </div>

        {/* Card 4: Study Telemetry Hours */}
        <div className="p-6 rounded-3xl glass-card-interactive border-white/10 hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t('totalStudyHours')}
            </span>
            <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-black text-white drop-shadow-sm">
              {(userStats.totalStudyMinutes / 60).toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">hours tracked</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-white/10 pt-2.5 flex items-center justify-between">
            <span>{userStats.totalSessionsCount} sessions</span>
            <span className="text-emerald-400 font-bold">{userStats.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Two Hero Features 3D Holographic Showcase Banner */}
      <HeroFeaturesBanner />

      {/* Bento Grid: 2 Columns on Desktop (7 cols / 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 7 Cols (In-App Tracker, Subject Dual Progress, Activity Heatmap) */}
        <div className="lg:col-span-7 space-y-6 min-w-0">
          {/* 1. In-App Study Tracker (Pomodoro + YouTube Player + Quick Log) */}
          <InAppStudyTracker />

          {/* 2. Subject Dual Progress Bars */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Semester 3 Subjects — Plain vs Priority Coverage
                </h3>
                <p className="text-xs text-slate-400">
                  The gap between the gray bar and indigo bar indicates whether you studied high-yield exam material.
                </p>
              </div>
              <Link
                href="/roadmap"
                className="floating-pill text-xs font-bold text-indigo-400 hover:text-white px-3 py-1.5 rounded-xl flex items-center gap-1 shrink-0"
              >
                Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {prediction.subjects.map((sub) => (
                <div
                  key={sub.subjectId}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        {sub.subjectName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({sub.credits} credits)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Predicted:</span>
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
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

          {/* 3. GitHub Activity Heatmap */}
          <StudyHeatmap />
        </div>

        {/* Right Column: 5 Cols (Interactive Todo List + Study Next Recommendations + Simulator) */}
        <div className="lg:col-span-5 space-y-6 min-w-0">
          {/* 1. Preloaded AKTU Study To-Do List */}
          <TodoList />

          {/* 2. Top "Study Next" High-Impact Recommendations */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.6)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Study Next (Marginal SGPA Gain)
                </h3>
              </div>
              <Link
                href="/recommendations"
                className="floating-pill text-xs font-bold text-indigo-400 hover:text-white px-3 py-1.5 rounded-xl flex items-center gap-1 shrink-0"
              >
                All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-slate-400">
              Topics ranked by highest predicted SGPA increase per study hour invested:
            </p>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec) => (
                <div
                  key={rec.topicId}
                  className="p-3.5 rounded-2xl glass-card-interactive border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">
                      {rec.topicName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rec.bucket === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : rec.bucket === 'Important'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {rec.bucket}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{rec.subjectName}</span>
                    <span className="font-mono">~{rec.estimatedHours}h est.</span>
                  </div>
                  <p className="text-[11px] text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                    {rec.reason}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/what-if"
              className="floating-tab-active w-full mt-2 py-3 px-4 text-xs font-bold rounded-2xl text-white text-center flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <span>Simulate SGPA Gains in What-If</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
