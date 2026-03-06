import React, { useState, useRef, useEffect } from 'react'
import { JournalEntry } from '@/types'
import { getCategoryColorClasses } from '@/utils/theme'
import { formatDateWithYear } from '@/utils/date'

interface SearchEntryCardProps {
  item: JournalEntry
  searchTerm: string
  togglingId: string | null
  deletingId: string | null
  onToggleFavorite: (item: JournalEntry) => void
  onDelete: (id: string) => void
}

const SearchEntryCard: React.FC<SearchEntryCardProps> = ({
  item,
  searchTerm,
  togglingId,
  deletingId,
  onToggleFavorite,
  onDelete,
}) => {
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
  }, [item.content])

  return (
    <article
      className={`group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all flex flex-col border-l-4 ${getCategoryColorClasses(item.category).border}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${getCategoryColorClasses(item.category).badge}`}
        >
          {item.category}
        </span>
        <span className="text-xs text-gray-400 font-medium">
          {formatDateWithYear(item.created_at)}
        </span>
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
        {searchTerm &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ? (
          <span className="bg-primary/20 text-primary dark:text-blue-300 px-0.5 rounded">
            {item.title}
          </span>
        ) : (
          item.title
        )}
      </h3>
      <div className="flex-1 flex flex-col items-start min-h-0 w-full mt-2">
        <div
          className={`relative transition-all duration-500 ease-in-out overflow-hidden w-full ${isExpanded ? 'max-h-[2000px]' : 'max-h-[63px]'}`}
        >
          <p
            ref={textRef}
            className={`text-sm text-gray-500 dark:text-gray-400 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'} w-full`}
          >
            {item.content}
          </p>
        </div>
        {hasOverflow && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-primary hover:underline mt-2 font-medium focus:outline-none"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Actions row */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 w-full">
        <button
          onClick={() => onToggleFavorite(item)}
          disabled={togglingId === item.id}
          className={`flex items-center gap-1 text-xs transition-colors ${item.is_favorite ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
        >
          <span className="material-icons-round text-base">
            {item.is_favorite ? 'favorite' : 'favorite_border'}
          </span>
        </button>
        <div className="flex-1" />
        <button
          onClick={() => onDelete(item.id)}
          disabled={deletingId === item.id}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
        >
          <span className="material-icons-round text-base">
            {deletingId === item.id ? 'hourglass_empty' : 'delete_outline'}
          </span>
          Delete
        </button>
      </div>
    </article>
  )
}

export default SearchEntryCard
