import { JournalEntry } from '@/types'

export const calculateStreak = (entries: JournalEntry[]): number => {
  let count = 0
  const check = new Date()
  check.setHours(0, 0, 0, 0)

  const daySet = new Set(
    entries.map((e) => {
      const d = new Date(e.created_at)
      d.setHours(0, 0, 0, 0)
      return d.getTime()
    }),
  )

  while (daySet.has(check.getTime())) {
    count++
    check.setDate(check.getDate() - 1)
  }

  return count
}
