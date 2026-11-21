'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { useI18n } from '../context/I18nContext';

export function SampleDataBadge({ className = '' }: { className?: string }) {
  const { t } = useI18n();
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 ${className}`}
      title="PYQ and syllabus data in this demo are structured sample datasets validated by Zod schemas."
    >
      <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      <span>{t('sampleDataNote')}</span>
    </div>
  );
}

export function EstimateBadge({ className = '' }: { className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 ${className}`}
    >
      {t('estimateNote')}
    </span>
  );
}
