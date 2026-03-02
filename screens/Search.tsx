import React, { useState } from 'react'
import { EntryCategory, JournalEntry } from '@/types'
import * as api from '@/api/entries'
import { getCategoryColorClasses } from '@/utils/theme'

interface SearchProps {
  entries: JournalEntry[]
  onEntryDeleted: (id: string) => void
  onEntryUpdated: (entry: JournalEntry) => void
}

const Search: React.FC<SearchProps> = ({
  entries,
  onEntryDeleted,
  onEntryUpdated,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const categories = ['All', ...Object.values(EntryCategory)]

  const results = entries.filter((e) => {
    const matchCat =
      selectedCategory === 'All' || e.category === selectedCategory
    const term = searchTerm.toLowerCase()
    const matchSearch =
      !term ||
      e.title.toLowerCase().includes(term) ||
      e.content.toLowerCase().includes(term)
    return matchCat && matchSearch
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return
    setDeletingId(id)
    try {
      await api.deleteEntry(id)
      onEntryDeleted(id)
    } catch {
      /* ignore */
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleFavorite = async (entry: JournalEntry) => {
    if (togglingId) return
    setTogglingId(entry.id)
    try {
      const updated = await api.toggleFavorite(entry.id)
      onEntryUpdated(updated)
    } catch {
      /* ignore */
    } finally {
      setTogglingId(null)
    }
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Search Journal
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Find your saved facts, words, and insights
          </p>
        </div>

        {/* Search bar */}
        <div className="relative group mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons-round text-gray-400 group-focus-within:text-primary transition-colors">
              search
            </span>
          </div>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-12 py-3.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all text-sm"
            placeholder="Search facts, words, insights..."
            type="text"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <span className="material-icons-round text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                close
              </span>
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {categories.map((cat) => {
            const isAll = cat === 'All'
            const isActive = selectedCategory === cat
            const colors = !isAll
              ? getCategoryColorClasses(cat as EntryCategory)
              : null

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? isAll
                      ? 'bg-primary text-white shadow-md shadow-primary/20 border border-primary'
                      : colors!.buttonActive
                    : `bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 ${isAll ? 'hover:border-primary/50' : colors!.buttonHover}`
                }`}
              >
                {cat}
              </button>
            )
          })}
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-primary text-sm font-medium ml-2 hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-xs font-medium text-gray-400 mb-4">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </p>

        {/* Results grid */}
        {results.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center gap-3">
            <span className="material-icons-round text-5xl text-slate-300 dark:text-slate-600">
              search_off
            </span>
            <p className="text-slate-500 dark:text-slate-400">
              No entries match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {results.map((item) => (
              <article
                key={item.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary/30 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${getCategoryColorClasses(item.category).badge}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {formatDate(item.created_at)}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {searchTerm &&
                  item.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ? (
                    <span className="bg-primary/20 text-primary dark:text-blue-300 px-0.5 rounded">
                      {item.title}
                    </span>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
                  {item.content}
                </p>

                {/* Actions row */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => handleToggleFavorite(item)}
                    disabled={togglingId === item.id}
                    className={`flex items-center gap-1 text-xs transition-colors ${item.is_favorite ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
                  >
                    <span className="material-icons-round text-base">
                      {item.is_favorite ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-icons-round text-base">
                      {deletingId === item.id
                        ? 'hourglass_empty'
                        : 'delete_outline'}
                    </span>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
