import { format, parseISO, isValid, startOfMonth, endOfMonth, differenceInDays, startOfWeek, endOfWeek } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * Format date to Indonesian locale string
 * @param {string|Date} date
 * @param {string} formatStr - date-fns format string
 * @returns {string}
 */
export function formatDate(date, formatStr = 'dd MMM yyyy') {
  if (!date) return '-'
  const d = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(d)) return '-'
  return format(d, formatStr, { locale: id })
}

/**
 * Format date for display (14 Jul 2026)
 */
export function formatDateDisplay(date) {
  return formatDate(date, 'd MMMM yyyy')
}

/**
 * Format date-time (14 Jul 2026 08:30)
 */
export function formatDateTime(date) {
  return formatDate(date, 'd MMM yyyy HH:mm')
}

/**
 * Format date for API (2026-07-14)
 */
export function formatDateAPI(date) {
  return formatDate(date, 'yyyy-MM-dd')
}

/**
 * Get month name (Juli 2026)
 */
export function formatMonthYear(date) {
  return formatDate(date, 'MMMM yyyy')
}

/**
 * Get sheet name format (2026-07)
 */
export function getSheetName(date) {
  return formatDate(date, 'yyyy-MM')
}

/**
 * Get current month range
 */
export function getCurrentMonthRange() {
  const now = new Date()
  return {
    start: startOfMonth(now),
    end: endOfMonth(now),
  }
}

/**
 * Get current week range
 */
export function getCurrentWeekRange() {
  const now = new Date()
  return {
    start: startOfWeek(now, { weekStartsOn: 1 }),
    end: endOfWeek(now, { weekStartsOn: 1 }),
  }
}

/**
 * Get number of days in current month so far
 */
export function getDaysElapsedInMonth() {
  const now = new Date()
  return differenceInDays(now, startOfMonth(now)) + 1
}

/**
 * Check if date is today
 */
export function isToday(date) {
  const d = typeof date === 'string' ? parseISO(date) : date
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

/**
 * Get list of months for a year
 */
export function getMonthsList(year) {
  const months = []
  for (let m = 0; m < 12; m++) {
    const d = new Date(year, m, 1)
    months.push({
      value: format(d, 'yyyy-MM'),
      label: format(d, 'MMMM', { locale: id }),
      month: m + 1,
    })
  }
  return months
}
