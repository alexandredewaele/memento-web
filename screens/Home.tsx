import React, { useState } from 'react'
import { JournalEntry } from '@/types'
import * as api from '@/api/entries'
import { Button } from '@/components/Button'
import { getCategoryColorClasses } from '@/utils/theme'
import { formatDateShort } from '@/utils/date'

interface HomeProps {
  entries: JournalEntry[]
  loading: boolean
  onAdd: () => void
  onFavoriteToggled: (entry: JournalEntry) => void
}

const Home: React.FC<HomeProps> = ({
  entries,
  loading,
  onAdd,
  onFavoriteToggled,
}) => {
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  const handleToggleFavorite = async (entry: JournalEntry) => {
    if (togglingId) return
    setTogglingId(entry.id)
    try {
      const updated = await api.toggleFavorite(entry.id)
      onFavoriteToggled(updated)
      if (selectedEntry?.id === updated.id) setSelectedEntry(updated)
    } catch {
      /* ignore */
    } finally {
      setTogglingId(null)
    }
  }

  const displayEntry = selectedEntry ?? entries[0] ?? null

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="material-icons-round animate-spin text-primary text-4xl">
          refresh
        </span>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <span className="material-icons-round text-primary text-3xl">
            auto_stories
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          No entries yet
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Click &quot;New Entry&quot; to capture your first learning.
        </p>
        <Button onClick={onAdd} className="mt-2 px-6 py-3">
          Add First Entry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Entry list (left column) */}
      <div className="w-80 shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Journal
            </span>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {entries.length} Entries
            </h1>
          </div>
          <button
            onClick={onAdd}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-primary"
            title="New entry"
          >
            <span className="material-icons-round">add_circle</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {entries.map((entry, idx) => {
            const colors = getCategoryColorClasses(entry.category)
            return (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className={`w-full text-left px-6 py-4 border-b border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-2 ${
                  displayEntry?.id === entry.id
                    ? `${colors.bgSelected} ${colors.border}`
                    : 'border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <span className="text-xs font-medium text-slate-400">
                      {formatDateShort(entry.created_at)}
                    </span>
                  </div>
                  {entry.is_favorite && (
                    <span className="material-icons-round text-red-400 text-sm">
                      favorite
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {entry.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {entry.content}
                </p>
                {idx === 0 && (
                  <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                    Latest
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Entry detail (right column) */}
      {displayEntry ? (
        <div className="flex-1 overflow-y-auto flex flex-col p-10 max-w-3xl">
          {/* Decorative blobs */}
          <div className="pointer-events-none fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="pointer-events-none fixed bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2" />

          <div className="flex items-start justify-between mb-8 relative z-10">
            <div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${getCategoryColorClasses(displayEntry.category).badge}`}
              >
                {displayEntry.category}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                {formatDateShort(displayEntry.created_at)}
              </p>
            </div>
            <button
              onClick={() => handleToggleFavorite(displayEntry)}
              disabled={togglingId === displayEntry.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-500 hover:text-red-400 hover:border-red-200 transition-colors"
            >
              <span
                className={`material-icons-round text-lg ${displayEntry.is_favorite ? 'text-red-400' : ''}`}
              >
                {displayEntry.is_favorite ? 'favorite' : 'favorite_border'}
              </span>
              {displayEntry.is_favorite ? 'Favorited' : 'Favorite'}
            </button>
          </div>

          <h1 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4 relative z-10">
            {displayEntry.title}
          </h1>

          {displayEntry.phonetic && (
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <span className="font-serif text-xl italic">
                {displayEntry.phonetic}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span className="text-xs font-semibold not-italic bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-tight">
                noun
              </span>
            </div>
          )}

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light relative z-10">
            {displayEntry.content}
          </p>

          {displayEntry.example && (
            <div className="mt-8 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-primary">
              <p className="text-slate-500 dark:text-slate-400 italic">
                &quot;{displayEntry.example}&quot;
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-600">
          <div className="text-center">
            <span className="material-icons-round text-6xl mb-4 opacity-30">
              auto_stories
            </span>
            <p className="text-sm">Select an entry to read</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
