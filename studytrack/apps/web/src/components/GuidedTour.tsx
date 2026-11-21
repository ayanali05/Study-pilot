'use client';

import React from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
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
      title: '1. The Hero Pitch & Live Dashboard',
      description:
        'StudyTrack bridges what students actually study with what AKTU past papers prove will be asked. Notice the Dual Progress Bars: plain topic count vs priority-weighted coverage. The gap between them is the core insight.',
    },
    {
      step: 2,
      route: '/roadmap',
      title: '2. Syllabus Roadmap & Dual Progress',
      description:
        'Explore CSE Sem 3 subjects. Clicking any topic toggles it as covered and instantly recalculates SGPA and priority weights across the entire system.',
    },
    {
      step: 3,
      route: '/pyq',
      title: '3. PYQ Intelligence & Live Sliders',
      description:
        '5 years of actual AKTU question papers analyzed. See which topics appeared 5/5 years, frequency, marks weights, and recency. Adjust the live weight sliders to customize the formula ranking.',
    },
    {
      step: 4,
      route: '/predictor',
      title: '4. SGPA Predictor & 10,000 Monte Carlo Runs',
      description:
        'The Hero Feature: Monte Carlo simulation with 10,000 runs producing a probability distribution of SGPA. Slide the target to see the probability of achieving an 8.5+ SGPA, plus full formula explainability.',
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
      route: '/recommendations',
      title: '6. "Study Next" & Practice Suite',
      description:
        'Topics ranked by marginal SGPA gain per study hour. Plus auto-generated study plans, flashcards with SM-2 spaced repetition, and practice tests.',
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
