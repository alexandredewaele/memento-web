import React, { useState, useRef, useEffect } from 'react'
import { JournalEntry } from '@/types'
import { getCategoryColorClasses } from '@/utils/theme'

interface HistoryEntryCardProps {
  entry: JournalEntry
}

const HistoryEntryCard: React.FC<HistoryEntryCardProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setHasOverflow(
          textRef.current.scrollHeight > textRef.current.clientHeight,
        )
      }
    }

    checkOverflow()
    const timeoutId = setTimeout(checkOverflow, 100)
    const timeoutId2 = setTimeout(checkOverflow, 500)
    window.addEventListener('resize', checkOverflow)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [entry.content])

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 max-w-2xl border-l-4 ${getCategoryColorClasses(entry.category).border}`}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${getCategoryColorClasses(entry.category).badge}`}
        >
          {entry.category}
        </span>
        <span
          className={`material-icons-round text-xl ${entry.is_favorite ? 'text-red-400' : 'text-slate-300 dark:text-slate-600'}`}
        >
          {entry.is_favorite ? 'favorite' : 'favorite_border'}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        {entry.title}
      </h3>
      <div
        className={`relative transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px]' : 'max-h-[78px]'} w-full`}
      >
        <p
          ref={textRef}
          className={`text-base text-slate-600 dark:text-slate-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}
        >
          {entry.content}
        </p>
      </div>
      {hasOverflow && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-primary hover:underline mt-2 font-medium focus:outline-none self-start"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
      {entry.example && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-l-4 border-primary">
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            &quot;{entry.example}&quot;
          </p>
        </div>
      )}
    </div>
  )
}

export default HistoryEntryCard
