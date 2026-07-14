/**
 * Mock API Service
 * Simulates backend responses with realistic delays
 */
import { MOCK_USERS, MOCK_CATEGORIES, MOCK_TRANSACTIONS, MOCK_AUDIT_LOG, MOCK_SETTINGS } from './data'

const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms))

function response(data, message = 'Berhasil') {
  return { success: true, message, data, timestamp: new Date().toISOString() }
}

function errorResponse(message) {
  return { success: false, message, data: null, timestamp: new Date().toISOString() }
}

// ======== AUTH ========
export async function mockLogin(username, password) {
  await delay(800)
  const user = MOCK_USERS.find(u => u.username === username)
  if (!user) return errorResponse('Username tidak ditemukan')
  // In mock, any password works
  if (password.length < 1) return errorResponse('Password wajib diisi')
  return response({
    user: { id: user.id, nama: user.nama, username: user.username, jabatan: user.jabatan },
    token: 'mock-token-' + Date.now(),
  }, 'Login berhasil')
}

export async function mockLogout() {
  await delay(300)
  return response(null, 'Logout berhasil')
}

// ======== DASHBOARD ========
export async function mockGetDashboard(month = '2026-07') {
  await delay(500)
  const trx = MOCK_TRANSACTIONS.filter(t => t.status === 'ACTIVE')
  const totalBulanIni = trx.reduce((sum, t) => sum + t.total, 0)
  const today = new Date().toISOString().split('T')[0]
  const totalHariIni = trx.filter(t => t.tanggal === today).reduce((sum, t) => sum + t.total, 0)

  // Category breakdown
  const categoryMap = {}
  trx.forEach(t => {
    categoryMap[t.kategori] = (categoryMap[t.kategori] || 0) + t.total
  })

  const categoryBreakdown = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  // Daily trend
  const dailyMap = {}
  trx.forEach(t => {
    const day = t.tanggal.split('-')[2]
    dailyMap[day] = (dailyMap[day] || 0) + t.total
  })
  const dailyTrend = Object.entries(dailyMap)
    .map(([day, total]) => ({ date: `${day} Jul`, total }))
    .sort((a, b) => parseInt(a.date) - parseInt(b.date))

  // User stats
  const userMap = {}
  trx.forEach(t => {
    if (!userMap[t.namaPenginput]) userMap[t.namaPenginput] = { count: 0, total: 0 }
    userMap[t.namaPenginput].count++
    userMap[t.namaPenginput].total += t.total
  })
  const userStats = Object.entries(userMap)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.count - a.count)

  const kategoriTerbesar = categoryBreakdown[0] || { name: '-', value: 0 }
  const penggunaTeraktif = userStats[0] || { name: '-', count: 0 }
  const pengeluaranTerbesar = [...trx].sort((a, b) => b.total - a.total)[0] || null
  const totalBulanLalu = 5800000 // Mock value

  return response({
    totalBulanIni,
    totalHariIni,
    totalMingguIni: trx.filter(t => {
      const d = new Date(t.tanggal)
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return d >= weekAgo && d <= now
    }).reduce((sum, t) => sum + t.total, 0),
    jumlahTransaksi: trx.length,
    rataRataHarian: Math.round(totalBulanIni / 14),
    kategoriTerbesar,
    penggunaTeraktif,
    pengeluaranTerbesar,
    totalBulanLalu,
    selisihBulanLalu: totalBulanIni - totalBulanLalu,
    categoryBreakdown,
    dailyTrend,
    userStats,
    recentTransactions: trx.slice(-10).reverse(),
    recentActivities: MOCK_AUDIT_LOG.slice(0, 10),
  })
}

// ======== TRANSACTIONS ========
export async function mockGetTransactions({ page = 1, pageSize = 20, search = '', category = '', sort = 'tanggal', order = 'desc' } = {}) {
  await delay(400)
  let data = [...MOCK_TRANSACTIONS].filter(t => t.status === 'ACTIVE')

  if (search) {
    const q = search.toLowerCase()
    data = data.filter(t =>
      t.uraian.toLowerCase().includes(q) ||
      t.kategori.toLowerCase().includes(q) ||
      t.nomorNota.toLowerCase().includes(q) ||
      t.namaPenginput.toLowerCase().includes(q)
    )
  }

  if (category) {
    data = data.filter(t => t.kategori === category)
  }

  // Sort
  data.sort((a, b) => {
    const aVal = a[sort]
    const bVal = b[sort]
    if (order === 'asc') return aVal > bVal ? 1 : -1
    return aVal < bVal ? 1 : -1
  })

  const totalData = data.length
  const totalHalaman = Math.ceil(totalData / pageSize)
  const start = (page - 1) * pageSize
  const paginatedData = data.slice(start, start + pageSize)

  return response({
    data: paginatedData,
    totalData,
    totalHalaman,
    halamanAktif: page,
    totalNominal: data.reduce((sum, t) => sum + t.total, 0),
  })
}

export async function mockGetTransaction(id) {
  await delay(300)
  const trx = MOCK_TRANSACTIONS.find(t => t.id === id)
  if (!trx) return errorResponse('Transaksi tidak ditemukan')
  return response(trx)
}

export async function mockCreateTransaction(data) {
  await delay(1000)
  const newId = `TRX-202607-${String(MOCK_TRANSACTIONS.length + 1).padStart(6, '0')}`
  const newTrx = {
    id: newId,
    ...data,
    total: data.volume * data.hargaSatuan,
    tanggalDibuat: new Date().toISOString(),
    tanggalDiubah: new Date().toISOString(),
    status: 'ACTIVE',
  }
  MOCK_TRANSACTIONS.push(newTrx)
  return response(newTrx, 'Transaksi berhasil disimpan')
}

export async function mockUpdateTransaction(id, data) {
  await delay(800)
  const idx = MOCK_TRANSACTIONS.findIndex(t => t.id === id)
  if (idx === -1) return errorResponse('Transaksi tidak ditemukan')
  MOCK_TRANSACTIONS[idx] = { ...MOCK_TRANSACTIONS[idx], ...data, tanggalDiubah: new Date().toISOString() }
  return response(MOCK_TRANSACTIONS[idx], 'Transaksi berhasil diperbarui')
}

export async function mockDeleteTransaction(id) {
  await delay(600)
  const idx = MOCK_TRANSACTIONS.findIndex(t => t.id === id)
  if (idx === -1) return errorResponse('Transaksi tidak ditemukan')
  MOCK_TRANSACTIONS[idx].status = 'DELETED'
  return response(null, 'Transaksi berhasil dihapus')
}

// ======== CATEGORIES ========
export async function mockGetCategories() {
  await delay(300)
  return response(MOCK_CATEGORIES.filter(c => c.statusAktif))
}

// ======== AUDIT LOG ========
export async function mockGetAuditLog({ page = 1, pageSize = 20 } = {}) {
  await delay(400)
  return response({
    data: MOCK_AUDIT_LOG,
    totalData: MOCK_AUDIT_LOG.length,
    totalHalaman: 1,
    halamanAktif: 1,
  })
}

// ======== SETTINGS ========
export const mockGetSettings = async () => {
  await delay()
  return { success: true, data: { organizationName: 'Masjid Jami Tamjid' } }
}

export const mockGetAnalytics = async (data) => {
  await delay()
  const year = data.year || '2026'
  return {
    success: true,
    data: {
      year,
      totalTahunan: 45000000,
      rataRataBulanan: 3750000,
      kategoriTerbesar: { name: 'Operasional', value: 15000000 },
      trendBulanan: [
        { month: 'Jan', total: 4500000 },
        { month: 'Feb', total: 5200000 },
        { month: 'Mar', total: 3800000 },
        { month: 'Apr', total: 6100000 },
        { month: 'Mei', total: 4900000 },
        { month: 'Jun', total: 5500000 },
        { month: 'Jul', total: 4200000 },
        { month: 'Ags', total: 3500000 },
        { month: 'Sep', total: 4100000 },
        { month: 'Okt', total: 0 },
        { month: 'Nov', total: 0 },
        { month: 'Des', total: 0 }
      ],
      categoryBreakdown: [
        { name: 'Operasional', value: 15000000 },
        { name: 'Pembangunan', value: 12000000 },
        { name: 'Sosial', value: 8000000 },
        { name: 'Konsumsi', value: 6000000 },
        { name: 'Lain-lain', value: 4000000 }
      ]
    }
  }
}
