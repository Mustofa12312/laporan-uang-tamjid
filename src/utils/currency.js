/**
 * Format number to Indonesian Rupiah
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
export function formatRupiah(amount) {
  if (amount == null || isNaN(amount)) return 'Rp0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Parse currency string to number
 * @param {string} value
 * @returns {number}
 */
export function parseRupiah(value) {
  if (!value) return 0
  return parseInt(String(value).replace(/[^\d]/g, ''), 10) || 0
}

/**
 * Format number with thousand separators
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  if (num == null || isNaN(num)) return '0'
  return new Intl.NumberFormat('id-ID').format(num)
}

/**
 * Calculate percentage change
 * @param {number} current
 * @param {number} previous
 * @returns {{ value: number, isPositive: boolean }}
 */
export function calcPercentageChange(current, previous) {
  if (!previous) return { value: 0, isPositive: true }
  const change = ((current - previous) / previous) * 100
  return {
    value: Math.abs(Math.round(change * 10) / 10),
    isPositive: change >= 0,
  }
}
