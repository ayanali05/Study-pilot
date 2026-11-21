import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-2xl border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-indigo-500/60 animate-ping" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-bold text-white tracking-wide">
          Syncing AKTU Intelligence Engine...
        </p>
        <p className="text-[10px] text-slate-400">
          Loading syllabus taxonomy, PYQ distributions, and SGPA formulas
        </p>
      </div>
    </div>
  );
}
