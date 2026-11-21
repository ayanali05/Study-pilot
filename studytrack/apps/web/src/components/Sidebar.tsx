'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Calculator,
  Map,
  FileSpreadsheet,
  GitCompare,
  Sparkles,
  GraduationCap,
  Layers,
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
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    {
      href: '/plan',
      label: 'Daily Study Calendar',
      icon: CalendarDays,
      badge: 'HERO',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      href: '/predictor',
      label: 'Mode B: SGPA Estimator',
      icon: Calculator,
      badge: `${prediction.sgpa.toFixed(1)} SGPA`,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    },
    { href: '/roadmap', label: 'Syllabus Roadmap', icon: Map },
    { href: '/pyq', label: 'PYQ Intelligence', icon: FileSpreadsheet },
    { href: '/what-if', label: 'What-If Simulator', icon: GitCompare },
    { href: '/recommendations', label: 'Study Next', icon: Sparkles },
    { href: '/tests', label: 'Practice Tests', icon: GraduationCap },
    { href: '/flashcards', label: 'Flashcards (SM-2)', icon: Layers },
    { href: '/coach', label: 'AI Study Coach', icon: Bot, badge: 'RAG' },
    { href: '/report', label: 'Report Card', icon: Award },
  ];

  return (
    <>
      {/* Desktop Floating Glass Monolith Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 glass-panel rounded-3xl my-3 ml-3 border border-white/15 flex-col sticky top-3 h-[calc(100vh-1.5rem)] overflow-hidden z-40 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
        {/* Brand */}
        <div className="h-16 px-5 flex items-center gap-3 border-b border-white/10 shrink-0 bg-white/[0.02]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/40 border border-white/20">
            ST
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white drop-shadow-sm">
                StudyTrack
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                v3
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              AKTU Intelligence Platform
            </p>
          </div>
        </div>

        {/* Navigation items with 3D Floating Tab Depth */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto floating-tab-container">
          <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Hero Engines
          </div>
          {navItems.slice(0, 3).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`floating-tab flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  active
                    ? 'floating-tab-active text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-white drop-shadow' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                      item.badgeColor ?? 'bg-white/10 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Curriculum & PYQ
          </div>
          {navItems.slice(3, 7).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`floating-tab flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  active
                    ? 'floating-tab-active text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-white drop-shadow' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}

          <div className="pt-3 px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Practice & AI
          </div>
          {navItems.slice(7).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`floating-tab flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  active
                    ? 'floating-tab-active text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-white drop-shadow' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile footer */}
        <div className="p-3 border-t border-white/10 shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-[11px] shadow-sm">
              RS
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">
                Rahul Sharma
              </div>
              <div className="text-[10px] text-slate-400">
                CSE Sem 3 • AKTU
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Floating Bottom Dock */}
      <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-50 glass-panel rounded-3xl p-1.5 flex items-center justify-around shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-white/20 backdrop-blur-2xl">
        {[
          { href: '/', label: 'Home', icon: LayoutDashboard },
          { href: '/plan', label: 'Plan', icon: CalendarDays },
          { href: '/predictor', label: 'SGPA', icon: Calculator },
          { href: '/roadmap', label: 'Syllabus', icon: Map },
          { href: '/pyq', label: 'PYQ', icon: FileSpreadsheet },
          { href: '/coach', label: 'Coach', icon: Bot },
        ].map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
                active
                  ? 'floating-tab-active text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-bold mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
