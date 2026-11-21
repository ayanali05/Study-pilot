'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
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
  RotateCcw,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { openJudgeModal, openTour, resetDemoData, syllabus } = useStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <Command className="w-full">
          <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4">
            <Command.Input
              placeholder="Search features, subjects, topics, or actions..."
              className="w-full h-12 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
              autoFocus
            />
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 text-xs">
            <Command.Empty className="p-4 text-center text-slate-500">
              No matching pages or topics found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-1 text-slate-400 uppercase font-bold text-[10px]">
              <Command.Item
                onSelect={() => navigate('/')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                <span>Dashboard</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/roadmap')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <Map className="w-4 h-4 text-indigo-500" />
                <span>Syllabus Roadmap & Knowledge Graph</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/pyq')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <FileSpreadsheet className="w-4 h-4 text-indigo-500" />
                <span>PYQ Intelligence Engine</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/predictor')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <Calculator className="w-4 h-4 text-indigo-500" />
                <span>SGPA Predictor (Hero) & Monte Carlo Simulation</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/what-if')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <GitCompare className="w-4 h-4 text-indigo-500" />
                <span>What-If Simulator</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/recommendations')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Study Next Recommender</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/tests')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                <span>Practice Tests</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/flashcards')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>Spaced Repetition Flashcards</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/plan')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <CalendarDays className="w-4 h-4 text-indigo-500" />
                <span>Exam Countdown & Study Plan</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigate('/coach')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <Bot className="w-4 h-4 text-indigo-500" />
                <span>AI Study Coach (RAG)</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions" className="px-2 py-1 text-slate-400 uppercase font-bold text-[10px]">
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  openJudgeModal();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                <span>Switch Scenario (Judge Mode)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  openTour();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
              >
                <Compass className="w-4 h-4 text-indigo-500" />
                <span>Start Guided Tour</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  resetDemoData();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600"
              >
                <RotateCcw className="w-4 h-4 text-rose-500" />
                <span>Reset Demo to Initial Seed</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Syllabus Subjects" className="px-2 py-1 text-slate-400 uppercase font-bold text-[10px]">
              {syllabus.subjects.map((sub) => (
                <Command.Item
                  key={sub.id}
                  onSelect={() => navigate(`/roadmap?subject=${sub.id}`)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600"
                >
                  <span>{sub.name} ({sub.code})</span>
                  <span className="text-[10px] text-slate-400">{sub.credits} Credits</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
