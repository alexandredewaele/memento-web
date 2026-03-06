export const formatDateShort = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

export const formatDateWithYear = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export const formatDateLong = (date: Date = new Date()) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

export const formatMonthYear = (year: number, month: number) =>
  new Date(year, month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate()

export const getFirstDayOfWeek = (year: number, month: number) =>
  (new Date(year, month, 1).getDay() + 6) % 7

export const formatFullDate = (year: number, month: number, day: number) =>
  new Date(year, month, day).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
