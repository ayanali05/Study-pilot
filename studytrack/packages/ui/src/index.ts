// ─── @studytrack/ui — Shared Utility Functions ───
// Design tokens, cn() helper, and shared utilities used by both web and extension.

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes intelligently: last conflicting class wins.
 * Usage: cn('p-4 bg-red-500', condition && 'bg-blue-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Design Tokens ───
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    critical: '#ef4444',
    important: '#f59e0b',
    optional: '#22c55e',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  },
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
} as const;

// ─── Bucket Colors ───
export function getBucketColor(bucket: 'Critical' | 'Important' | 'Optional'): string {
  switch (bucket) {
    case 'Critical': return tokens.colors.critical;
    case 'Important': return tokens.colors.important;
    case 'Optional': return tokens.colors.optional;
  }
}

export function getBucketBadgeClasses(bucket: 'Critical' | 'Important' | 'Optional'): string {
  switch (bucket) {
    case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    case 'Important': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'Optional': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  }
}
