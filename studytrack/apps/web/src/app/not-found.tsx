'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Bot, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-black text-2xl shadow-inner">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The requested syllabus module, PYQ analysis, or predictor route doesn&apos;t exist or has been relocated in the latest curriculum update.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="floating-pill-active inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
          <Link
            href="/coach"
            className="floating-pill inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-300 hover:text-white border border-white/10"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Ask AI Coach</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
