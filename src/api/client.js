/**
 * API Client
 * Switches between mock API and real GAS API based on env
 */
import * as mockApi from './mock/mockApi'

// Set to true to use real GAS API
const USE_REAL_API = false
const GAS_API_URL = import.meta.env.VITE_GAS_API_URL || ''

// For now, export mock API directly
// When GAS is ready, we'll swap implementations

export const authApi = {
  login: (username, password) => mockApi.mockLogin(username, password),
  logout: () => mockApi.mockLogout(),
}

export const dashboardApi = {
  get: (month) => mockApi.mockGetDashboard(month),
}

export const transactionApi = {
  list: (params) => mockApi.mockGetTransactions(params),
  get: (id) => mockApi.mockGetTransaction(id),
  create: (data) => mockApi.mockCreateTransaction(data),
  update: (id, data) => mockApi.mockUpdateTransaction(id, data),
  delete: (id) => mockApi.mockDeleteTransaction(id),
}

export const categoryApi = {
  list: () => mockApi.mockGetCategories(),
}

export const auditApi = {
  list: (params) => mockApi.mockGetAuditLog(params),
}

export const settingApi = {
  get: () => mockApi.mockGetSettings(),
}
