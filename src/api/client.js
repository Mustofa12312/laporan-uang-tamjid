import axios from 'axios'
import * as mockApi from './mock/mockApi'

// Jika URL GAS tersedia di .env, kita gunakan API Asli, jika tidak, gunakan Mock
const GAS_API_URL = import.meta.env.VITE_GAS_API_URL || ''
const USE_REAL_API = Boolean(GAS_API_URL)

// Konfigurasi instance axios untuk komunikasi dengan GAS
const apiClient = axios.create({
  baseURL: GAS_API_URL,
  headers: {
    'Content-Type': 'text/plain;charset=utf-8',
  },
})

// Fungsi helper untuk POST ke Google Apps Script (karena keterbatasan CORS di GAS)
const gasPost = async (action, data = {}) => {
  try {
    // GAS menerima POST request dengan parameter action di URL
    const response = await apiClient.post(`?action=${action}`, data)
    return response.data
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
    ? (username, password) => gasPost('login', { username, password })
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
    ? (month) => gasPost('dashboard', { month })
    : mockApi.mockGetDashboard,
}

// ============================================
// TRANSACTION API
// ============================================
export const transactionApi = {
  list: USE_REAL_API
    ? (params) => gasPost('getTransactions', params)
    : mockApi.mockGetTransactions,
    
  get: USE_REAL_API
    ? (id) => gasPost('getTransaction', { id })
    : mockApi.mockGetTransaction,
    
  create: USE_REAL_API
    ? (data) => gasPost('createTransaction', data)
    : mockApi.mockCreateTransaction,
    
  update: USE_REAL_API
    ? (id, data) => gasPost('updateTransaction', { id, ...data })
    : mockApi.mockUpdateTransaction,
    
  delete: USE_REAL_API
    ? (id, username) => gasPost('deleteTransaction', { id, username })
    : mockApi.mockDeleteTransaction,
}

// ============================================
// CATEGORY API
// ============================================
export const categoryApi = {
  list: USE_REAL_API
    ? () => gasPost('getCategories')
    : mockApi.mockGetCategories,
}

// ============================================
// AUDIT LOG API
// ============================================
export const auditApi = {
  list: USE_REAL_API
    ? (params) => gasPost('getAuditLog', params)
    : mockApi.mockGetAuditLog,
}

// ============================================
// SETTING API
// ============================================
export const settingApi = {
  get: USE_REAL_API
    ? () => gasPost('getSettings')
    : mockApi.mockGetSettings,
}
