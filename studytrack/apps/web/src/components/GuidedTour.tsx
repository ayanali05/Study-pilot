'use client';

import React from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Target, Calendar, BarChart3, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useRouter } from 'next/navigation';

export function GuidedTour() {
  const { isTourOpen, closeTour, tourStep, nextTourStep, prevTourStep } = useStore();
  const router = useRouter();

  if (!isTourOpen) return null;

  const tourSteps = [
    {
      step: 1,
      route: '/',
      title: '1. Live Bento Dashboard & Telemetry',
      description:
        'StudyTrack combines what you study with what AKTU past papers prove will be asked. Notice the Dual Progress Bars: plain topic count vs priority-weighted coverage. The gap is the core insight.',
    },
    {
      step: 2,
      route: '/predictor',
      title: '2. HERO FEATURE: Mode B Academic Estimator',
      description:
        'Mode B calculates dynamic SGPA using 10,000 Monte Carlo runs based on covered syllabus, 5-year PYQ repeat probability, and internal marks. Click "How was this calculated?" for complete formula transparency.',
    },
    {
      step: 3,
      route: '/plan',
      title: '3. HERO FEATURE: Personalized Daily Study Calendar',
      description:
        'Day-by-day exam roadmap prioritizing Critical PYQs first. Interactive week tabs, topic completion checkboxes (+45 XP!), and 1-click export to Google/Apple Calendar (.ics).',
    },
    {
      step: 4,
      route: '/pyq',
      title: '4. PYQ Intelligence & 5-Year Repeat Sliders',
      description:
        '5 years of actual AKTU question papers analyzed. See topics that appeared 5/5 years, frequency weights, and live sliders to customize the formula ranking.',
    },
    {
      step: 5,
      route: '/what-if',
      title: '5. What-If Simulator',
      description:
        'Simulate covering upcoming topics to see exact animated SGPA and grade gains without mutating real student progress.',
    },
    {
      step: 6,
      route: '/coach',
      title: '6. AI Study Coach (RAG Grounded)',
      description:
        'Server-side Gemini AI coach with zero client API keys. Explains difficult concepts, builds emergency crash plans, and cites exact AKTU PYQ question sources.',
    },
  ];

  const current = tourSteps[tourStep] ?? tourSteps[0]!;

  const handleNext = () => {
    if (tourStep < tourSteps.length - 1) {
      nextTourStep();
      const nextRoute = tourSteps[tourStep + 1]?.route;
      if (nextRoute) router.push(nextRoute);
    } else {
      closeTour();
    }
  };

  const handlePrev = () => {
    if (tourStep > 0) {
      prevTourStep();
      const prevRoute = tourSteps[tourStep - 1]?.route;
      if (prevRoute) router.push(prevRoute);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-indigo-500 p-5 animate-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-500/15 text-indigo-600 flex items-center justify-center font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            60-Second Judge Tour ({current.step}/6)
          </span>
        </div>
        <button
          onClick={closeTour}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
          {current.title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {current.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handlePrev}
          disabled={tourStep === 0}
          className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-500/20"
        >
          {tourStep === tourSteps.length - 1 ? 'Finish Tour' : 'Next Step'}{' '}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
