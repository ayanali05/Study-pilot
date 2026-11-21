'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { HelpCircle, Calculator, CheckCircle2 } from 'lucide-react';

export function CalculationPanel() {
  const { prediction } = useStore();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            How was your SGPA calculated? (Explainability View)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No black boxes. Every number is derived from the pure TypeScript engine and official AKTU formula.
          </p>
        </div>
      </div>

      {/* Core Step Breakdown */}
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
            Priority-Weighted Coverage
          </div>
          <code className="block p-2 rounded bg-white dark:bg-slate-900 text-xs font-mono text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800">
            priority_coverage = Σ(priority of covered topics) ÷ Σ(priority of all topics)
          </code>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Unlike plain percentage, a student who covers 5 Critical topics gets a much higher score than one who covers 8 Optional topics.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
            Composite Readiness Score
          </div>
          <code className="block p-2 rounded bg-white dark:bg-slate-900 text-xs font-mono text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800">
            readiness = 0.60·priority_coverage + 0.25·(confidence/5) + 0.15·test_accuracy
          </code>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            If test results are not yet recorded for a subject, weights redistribute automatically to 0.75 coverage + 0.25 confidence.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
            External Marks (/70) & Total (/100)
          </div>
          <code className="block p-2 rounded bg-white dark:bg-slate-900 text-xs font-mono text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800">
            predicted_external = readiness × 70 × 0.92 (realism cap)
            total = predicted_external + user_internal_marks (/30)
          </code>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The 0.92 realism cap prevents over-optimism. Total is mapped to AKTU grade points (O=10, A+=9, A=8, B+=7, B=6, C=5, F=0).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">4</span>
            Final SGPA
          </div>
          <code className="block p-2 rounded bg-white dark:bg-slate-900 text-xs font-mono text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800">
            SGPA = Σ(credits × grade_points) ÷ Σ(credits) = {prediction.sgpa.toFixed(2)}
          </code>
        </div>
      </div>

      {/* Actual Subject Numbers Table */}
      <div className="pt-2">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">
          Live Values for Your Subjects:
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="p-2.5">Subject</th>
                <th className="p-2.5">Priority Coverage</th>
                <th className="p-2.5">Readiness</th>
                <th className="p-2.5">Ext (/70)</th>
                <th className="p-2.5">Int (/30)</th>
                <th className="p-2.5">Total</th>
                <th className="p-2.5">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {prediction.subjects.map((s) => (
                <tr key={s.subjectId}>
                  <td className="p-2.5 font-semibold text-slate-900 dark:text-white">
                    {s.subjectName} ({s.credits} cr)
                  </td>
                  <td className="p-2.5">{(s.priorityWeightedCoverage * 100).toFixed(0)}%</td>
                  <td className="p-2.5">{(s.readiness * 100).toFixed(0)}%</td>
                  <td className="p-2.5 font-mono">{s.predictedExternal}</td>
                  <td className="p-2.5 font-mono">{s.internalMarks}</td>
                  <td className="p-2.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {s.predictedTotal}
                  </td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 rounded font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {s.predictedGrade} ({s.predictedGradePoints})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
