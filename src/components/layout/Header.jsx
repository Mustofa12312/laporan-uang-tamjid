import { useState } from 'react'
import { Search, Moon, Sun, Monitor, Bell, User, Menu } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useAuthStore } from '@/store/authStore'

export default function Header({ onMobileMenuOpen }) {
  const { theme, setTheme } = useThemeStore()
  const user = useAuthStore(s => s.user)
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  const themeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor
  const ThemeIcon = themeIcon

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-surface-card-dark/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark px-4 lg:px-6 flex items-center gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuOpen}
        className="btn-icon lg:hidden"
        aria-label="Menu"
      >
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari transaksi..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary-500 dark:focus:border-primary-400 rounded-btn text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="btn-icon"
            aria-label="Ganti tema"
          >
            <ThemeIcon size={20} />
          </button>
          {showThemeMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowThemeMenu(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-surface-card-dark border border-border-light dark:border-border-dark rounded-card shadow-lg py-1 z-20 min-w-[140px]">
                {[
                  { value: 'light', icon: Sun, label: 'Light' },
                  { value: 'dark', icon: Moon, label: 'Dark' },
                  { value: 'auto', icon: Monitor, label: 'Auto' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setTheme(opt.value); setShowThemeMenu(false) }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors
                      ${theme === opt.value ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  >
                    <opt.icon size={16} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notification */}
        <button className="btn-icon relative" aria-label="Notifikasi">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 ml-2 pl-3 border-l border-border-light dark:border-border-dark">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold">
            {user?.nama?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{user?.nama || 'User'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{user?.jabatan || 'Pengguna'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
