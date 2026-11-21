'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  FileSpreadsheet,
  Calculator,
  GitCompare,
  Sparkles,
  GraduationCap,
  Layers,
  CalendarDays,
  Bot,
  Award,
} from 'lucide-react';
import { useI18n } from '../context/I18nContext';
import { useStore } from '../context/StoreContext';

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { prediction } = useStore();

  const navItems = [
    { href: '/', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/roadmap', label: t('roadmap'), icon: Map },
    { href: '/pyq', label: t('pyq'), icon: FileSpreadsheet },
    {
      href: '/predictor',
      label: t('predictor'),
      icon: Calculator,
      badge: `${prediction.sgpa.toFixed(1)} SGPA`,
      badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
    },
    { href: '/what-if', label: t('whatIf'), icon: GitCompare },
    { href: '/recommendations', label: t('recommendations'), icon: Sparkles },
    { href: '/tests', label: t('tests'), icon: GraduationCap },
    { href: '/flashcards', label: t('flashcards'), icon: Layers },
    { href: '/plan', label: t('plan'), icon: CalendarDays },
    { href: '/coach', label: t('coach'), icon: Bot, badge: 'RAG' },
    { href: '/report', label: t('report'), icon: Award },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col min-h-screen">
      {/* Brand */}
      <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
          ST
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
              StudyTrack
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              v3.0
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            AKTU SGPA Predictor & PYQ
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Academic Engine
        </div>
        {navItems.slice(0, 6).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor ?? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4 px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          AI & Practice Tools
        </div>
        {navItems.slice(6).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 font-semibold flex items-center justify-center text-xs">
            RS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              Rahul Sharma
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              CSE Sem 3 • AKTU
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
