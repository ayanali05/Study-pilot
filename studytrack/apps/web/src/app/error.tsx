'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client error to monitoring service
    console.error('StudyTrack Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-rose-500/30 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden bg-rose-950/20 backdrop-blur-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-white">
            Something went wrong
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            An unexpected error occurred while processing academic intelligence data. Your saved progress is preserved in local storage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="floating-pill-active inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="floating-pill inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-300 hover:text-white border border-white/10"
          >
            <Home className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
