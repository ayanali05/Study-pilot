'use client';

import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SampleDataBadge } from '../../components/SampleDataBadge';
import { reviewFlashcard } from '@studytrack/engine';
import { Layers, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import type { Flashcard } from '@studytrack/data';

export default function FlashcardsPage() {
  const { flashcards, updateFlashcardReview } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = flashcards[currentIdx] ?? flashcards[0];

  const handleRating = (quality: number) => {
    if (!card) return;
    const result = reviewFlashcard(quality, card.easeFactor, card.interval, card.repetitions);
    const updated: Flashcard = {
      ...card,
      easeFactor: result.easeFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReviewDate: result.nextReviewDate,
      lastReviewDate: new Date().toISOString(),
    };
    updateFlashcardReview(updated);

    // Move to next card
    setIsFlipped(false);
    setCurrentIdx((i) => (i + 1) % flashcards.length);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Spaced Repetition (SM-2 Flashcards)
            </h1>
            <SampleDataBadge />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            SuperMemo SM-2 algorithm schedules optimal retention intervals so you review just before forgetting.
          </p>
        </div>
      </div>

      {card && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>
              Card {currentIdx + 1} of {flashcards.length}
            </span>
            <span>
              Ease Factor: <strong className="text-indigo-600">{card.easeFactor.toFixed(2)}</strong> • Reps: {card.repetitions}
            </span>
          </div>

          {/* 3D Floating Air Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[260px] p-8 rounded-3xl glass-panel border border-indigo-400/40 shadow-[0_20px_50px_rgba(99,102,241,0.25)] cursor-pointer flex flex-col justify-between transition-all select-none hover:border-indigo-400 floating-tab"
          >
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {isFlipped ? 'Answer (Back)' : 'Question (Front)'}
              </span>
              <span className="text-xs text-slate-400">Click card to flip</span>
            </div>

            <div className="py-6 text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {isFlipped ? card.back : card.front}
              </div>
            </div>

            <div className="text-center text-xs text-slate-400">
              {isFlipped ? 'Rate your recall difficulty below' : 'Tap to reveal answer'}
            </div>
          </div>

          {/* SM-2 Recall Rating Buttons */}
          {isFlipped ? (
            <div className="space-y-2 pt-2 animate-in fade-in duration-200">
              <div className="text-xs font-semibold text-center text-slate-600 dark:text-slate-400">
                How easily did you recall this answer?
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleRating(0)}
                  className="p-3 text-xs font-bold rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500/25"
                >
                  Forgot (0)
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">Reset interval</div>
                </button>
                <button
                  onClick={() => handleRating(3)}
                  className="p-3 text-xs font-bold rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25"
                >
                  Hard (3)
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">+1 day</div>
                </button>
                <button
                  onClick={() => handleRating(4)}
                  className="p-3 text-xs font-bold rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/25"
                >
                  Good (4)
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">Graduating</div>
                </button>
                <button
                  onClick={() => handleRating(5)}
                  className="p-3 text-xs font-bold rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25"
                >
                  Easy (5)
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">Long interval</div>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center pt-2">
              <button
                onClick={() => setIsFlipped(true)}
                className="px-6 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
              >
                Reveal Answer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
