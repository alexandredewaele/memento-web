import React, { useState } from 'react'
import { EntryCategory, JournalEntry } from '@/types'
import * as api from '@/api/entries'
import { Button } from '@/components/Button'
import { getCategoryColorClasses } from '@/utils/theme'

interface NewEntryProps {
  onSaved: (entry: JournalEntry) => void
  onCancel: () => void
}

const NewEntry: React.FC<NewEntryProps> = ({ onSaved, onCancel }) => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<EntryCategory>(EntryCategory.FACT)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    {
      type: EntryCategory.FACT,
      icon: 'lightbulb',
      desc: 'An interesting fact',
    },
    { type: EntryCategory.WORD, icon: 'spellcheck', desc: 'A new word' },
    {
      type: EntryCategory.INSIGHT,
      icon: 'visibility',
      desc: 'A personal insight',
    },
    {
      type: EntryCategory.QUOTE,
      icon: 'format_quote',
      desc: 'A memorable quote',
    },
  ]

  const handleSave = async () => {
    if (!content.trim()) return
    const entryTitle =
      title.trim() || content.split(' ').slice(0, 3).join(' ') + '...'
    setLoading(true)
    setError('')
    try {
      const entry = await api.createEntry({
        title: entryTitle,
        content,
        category,
      })
      onSaved(entry)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save entry.')
      setLoading(false)
    }
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      <div className="max-w-2xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-1">
              New Entry
            </p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {today}
            </h1>
          </div>
          <button
            onClick={onCancel}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="material-icons-round text-xl">close</span>
          </button>
        </div>

        {/* Category picker */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const isActive = category === cat.type
              const colors = getCategoryColorClasses(cat.type)
              return (
                <button
                  key={cat.type}
                  onClick={() => setCategory(cat.type)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl text-sm font-medium transition-all border ${
                    isActive
                      ? colors.buttonActive
                      : `bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 ${colors.buttonHover}`
                  }`}
                >
                  <span className="material-icons-round text-2xl">
                    {cat.icon}
                  </span>
                  <span className="capitalize">{cat.type}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give it a title (optional)"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-lg font-bold placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Content{' '}
            <span className="text-gray-400 normal-case font-normal">
              ({content.length}/5000)
            </span>
          </label>
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none text-base leading-relaxed placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary caret-primary text-gray-900 dark:text-white"
            placeholder="What did you learn today? Capture a fact, a word, or a moment of clarity..."
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 mb-4">
            <span className="material-icons-round text-red-500 text-base">
              error_outline
            </span>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={onCancel} className="px-6 py-3">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!content.trim()}
            isLoading={loading}
            className="flex-1 py-3 px-6"
          >
            Save to Journal{' '}
            <span className="material-icons-round">arrow_forward</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewEntry
