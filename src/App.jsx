import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import TransactionPage from '@/pages/TransactionPage'
import AddTransactionPage from '@/pages/AddTransactionPage'
import EditTransactionPage from '@/pages/EditTransactionPage'
import ReportPage from '@/pages/ReportPage'
import ReportYearlyPage from '@/pages/ReportYearlyPage'
import ReportCategoryPage from '@/pages/ReportCategoryPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import ExportPage from '@/pages/ExportPage'
import AuditLogPage from '@/pages/AuditLogPage'
import SettingPage from '@/pages/SettingPage'
import SettingUserPage from '@/pages/SettingUserPage'
import SettingProfilePage from '@/pages/SettingProfilePage'
import SettingSystemPage from '@/pages/SettingSystemPage'
import SystemStatusPage from '@/pages/SystemStatusPage'

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

function PublicRoute({ children }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const initTheme = useThemeStore(s => s.initTheme)

  useEffect(() => {
    initTheme()

    // Listen for system theme changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const theme = useThemeStore.getState().theme
      if (theme === 'auto') initTheme()
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute><LoginPage /></PublicRoute>
      } />

      {/* Protected Routes */}
      <Route element={
        <ProtectedRoute><AppLayout /></ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="transaksi" element={<TransactionPage />} />
        <Route path="transaksi/tambah" element={<AddTransactionPage />} />
        <Route path="transaksi/edit/:id" element={<EditTransactionPage />} />
        <Route path="laporan" element={<ReportPage />} />
        <Route path="laporan/bulanan" element={<ReportPage />} />
        <Route path="laporan/tahunan" element={<ReportYearlyPage />} />
        <Route path="laporan/kategori" element={<ReportCategoryPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="export" element={<ExportPage />} />
        <Route path="audit-log" element={<AuditLogPage />} />
        <Route path="pengaturan" element={<SettingPage />} />
        <Route path="pengaturan/kategori" element={<SettingPage />} />
        <Route path="pengaturan/pengguna" element={<SettingUserPage />} />
        <Route path="pengaturan/profil" element={<SettingProfilePage />} />
        <Route path="pengaturan/sistem" element={<SettingSystemPage />} />
        <Route path="system-status" element={<SystemStatusPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center gradient-bg">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="mt-2 text-xl opacity-80">Halaman tidak ditemukan</p>
            <a href="/" className="inline-block mt-4 px-6 py-2 bg-white/20 rounded-btn hover:bg-white/30 transition-colors">
              Kembali ke Dashboard
            </a>
          </div>
        </div>
      } />
    </Routes>
  )
}
