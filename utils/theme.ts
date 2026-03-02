import { EntryCategory } from '@/types/models'

export const getCategoryColorClasses = (category: EntryCategory) => {
  switch (category) {
    case EntryCategory.FACT:
      return {
        border: 'border-l-blue-500 dark:border-l-blue-400',
        bgSelected: 'bg-blue-50/80 dark:bg-blue-900/10',
        text: 'text-blue-600 dark:text-blue-400',
        dot: 'bg-blue-500',
        badge:
          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        buttonActive:
          'bg-blue-500 text-white shadow-lg shadow-blue-500/20 border-blue-500',
        buttonHover:
          'hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400',
      }
    case EntryCategory.WORD:
      return {
        border: 'border-l-emerald-500 dark:border-l-emerald-400',
        bgSelected: 'bg-emerald-50/80 dark:bg-emerald-900/10',
        text: 'text-emerald-600 dark:text-emerald-400',
        dot: 'bg-emerald-500',
        badge:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        buttonActive:
          'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 border-emerald-500',
        buttonHover:
          'hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400',
      }
    case EntryCategory.INSIGHT:
      return {
        border: 'border-l-amber-500 dark:border-l-amber-400',
        bgSelected: 'bg-amber-50/80 dark:bg-amber-900/10',
        text: 'text-amber-600 dark:text-amber-400',
        dot: 'bg-amber-500',
        badge:
          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        buttonActive:
          'bg-amber-500 text-white shadow-lg shadow-amber-500/20 border-amber-500',
        buttonHover:
          'hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400',
      }
    case EntryCategory.QUOTE:
      return {
        border: 'border-l-purple-500 dark:border-l-purple-400',
        bgSelected: 'bg-purple-50/80 dark:bg-purple-900/10',
        text: 'text-purple-600 dark:text-purple-400',
        dot: 'bg-purple-500',
        badge:
          'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
        buttonActive:
          'bg-purple-500 text-white shadow-lg shadow-purple-500/20 border-purple-500',
        buttonHover:
          'hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-400',
      }
    default:
      return {
        border: 'border-l-slate-500 dark:border-l-slate-400',
        bgSelected: 'bg-slate-50 dark:bg-slate-800/40',
        text: 'text-slate-600 dark:text-slate-400',
        dot: 'bg-slate-500',
        badge:
          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
        buttonActive:
          'bg-slate-500 text-white shadow-lg shadow-slate-500/20 border-slate-500',
        buttonHover:
          'hover:border-slate-500/50 hover:text-slate-600 dark:hover:text-slate-400',
      }
  }
}
