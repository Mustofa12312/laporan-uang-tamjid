import * as mockApi from './mock/mockApi'

// Jika URL GAS tersedia di .env, kita gunakan API Asli, jika tidak, gunakan Mock
const GAS_API_URL = import.meta.env.VITE_GAS_API_URL || ''
const USE_REAL_API = Boolean(GAS_API_URL)

// Fungsi helper untuk request ke Google Apps Script
// Menggunakan metode GET untuk menghindari blokir CORS yang agresif pada metode POST di Google Apps Script.
const gasRequest = async (action, data = {}) => {
  try {
    let url = `${GAS_API_URL}?action=${action}`
    
    // Untuk aksi selain upload, ubah semua data menjadi parameter URL (GET request)
    // Ini adalah solusi paling ampuh untuk menembus CORS Google Apps Script
    if (action !== 'upload') {
      const queryParams = new URLSearchParams()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
        }
      })
      
      const queryString = queryParams.toString()
      if (queryString) url += `&${queryString}`

      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
      })
      return await response.json()
    } 
    
    // Khusus untuk upload gambar (karena base64 terlalu panjang untuk GET URL)
    else {
      const response = await fetch(url, {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(data) 
        // Tanpa menyertakan custom headers agar tidak memicu preflight CORS
      })
      return await response.json()
    }

  } catch (error) {
    console.error(`Error API (${action}):`, error)
    return { success: false, message: 'Gagal terhubung ke server (GAS)', data: null }
  }
}

// ============================================
// AUTH API
// ============================================
export const authApi = {
  login: USE_REAL_API
    ? (username, password) => gasRequest('login', { username, password })
    : mockApi.mockLogin,
    
  logout: USE_REAL_API
    ? () => Promise.resolve({ success: true, message: 'Logout berhasil' })
    : mockApi.mockLogout,
}

// ============================================
// DASHBOARD API
// ============================================
export const dashboardApi = {
  get: USE_REAL_API
    ? (month) => gasRequest('dashboard', { month })
    : mockApi.mockGetDashboard,
}

// ============================================
// TRANSACTION API
// ============================================
export const transactionApi = {
  list: USE_REAL_API
    ? (params) => gasRequest('getTransactions', params)
    : mockApi.mockGetTransactions,
    
  get: USE_REAL_API
    ? (id) => gasRequest('getTransaction', { id })
    : mockApi.mockGetTransaction,
    
  create: USE_REAL_API
    ? (data) => gasRequest('createTransaction', data)
    : mockApi.mockCreateTransaction,
    
  update: USE_REAL_API
    ? (id, data) => gasRequest('updateTransaction', { id, ...data })
    : mockApi.mockUpdateTransaction,
    
  delete: USE_REAL_API
    ? (id, username) => gasRequest('deleteTransaction', { id, username })
    : mockApi.mockDeleteTransaction,
}

// ============================================
// CATEGORY API
// ============================================
export const categoryApi = {
  list: USE_REAL_API
    ? () => gasRequest('getCategories')
    : mockApi.mockGetCategories,
}

// ============================================
// AUDIT LOG API
// ============================================
export const auditApi = {
  list: USE_REAL_API
    ? (params) => gasRequest('getAuditLog', params)
    : mockApi.mockGetAuditLog,
}

// ============================================
// SETTING API
// ============================================
export const settingApi = {
  get: USE_REAL_API
    ? () => gasRequest('getSettings')
    : mockApi.mockGetSettings,
}

// ============================================
// ANALYTICS API
// ============================================
export const analyticsApi = {
  getYearly: USE_REAL_API
    ? (year) => gasRequest('analytics', { year })
    : mockApi.mockGetAnalytics,
}
