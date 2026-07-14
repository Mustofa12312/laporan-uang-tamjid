import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import TransactionPage from '@/pages/TransactionPage'
import AddTransactionPage from '@/pages/AddTransactionPage'
import ReportPage from '@/pages/ReportPage'
import AuditLogPage from '@/pages/AuditLogPage'
import SettingPage from '@/pages/SettingPage'

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

// Placeholder pages for routes that will be built out
function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-1">Halaman ini sedang dalam pengembangan</p>
    </div>
  )
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
        <Route path="transaksi/edit/:id" element={<PlaceholderPage title="Edit Transaksi" />} />
        <Route path="laporan" element={<ReportPage />} />
        <Route path="laporan/bulanan" element={<ReportPage />} />
        <Route path="laporan/tahunan" element={<PlaceholderPage title="Laporan Tahunan" />} />
        <Route path="laporan/kategori" element={<PlaceholderPage title="Laporan Per Kategori" />} />
        <Route path="analytics" element={<PlaceholderPage title="Analytics" />} />
        <Route path="export" element={<PlaceholderPage title="Export" />} />
        <Route path="audit-log" element={<AuditLogPage />} />
        <Route path="pengaturan" element={<SettingPage />} />
        <Route path="pengaturan/kategori" element={<SettingPage />} />
        <Route path="pengaturan/pengguna" element={<PlaceholderPage title="Pengguna" />} />
        <Route path="pengaturan/profil" element={<PlaceholderPage title="Profil" />} />
        <Route path="pengaturan/sistem" element={<PlaceholderPage title="Pengaturan Sistem" />} />
        <Route path="system-status" element={<PlaceholderPage title="System Status" />} />
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
