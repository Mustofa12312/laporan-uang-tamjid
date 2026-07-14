import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Receipt, FileText, BarChart3, Download,
  Settings, History, ChevronDown, ChevronLeft, LogOut
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { ORG_NAME } from '@/constants/routes'

const iconMap = {
  LayoutDashboard, Receipt, FileText, BarChart3, Download, Settings, History,
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/transaksi', label: 'Transaksi', icon: 'Receipt' },
  {
    path: '/laporan', label: 'Laporan', icon: 'FileText',
    children: [
      { path: '/laporan/bulanan', label: 'Bulanan' },
      { path: '/laporan/tahunan', label: 'Tahunan' },
      { path: '/laporan/kategori', label: 'Per Kategori' },
    ]
  },
  { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
  { path: '/export', label: 'Export', icon: 'Download' },
  {
    path: '/pengaturan', label: 'Pengaturan', icon: 'Settings',
    children: [
      { path: '/pengaturan/kategori', label: 'Kategori' },
      { path: '/pengaturan/pengguna', label: 'Pengguna' },
      { path: '/pengaturan/profil', label: 'Profil' },
    ]
  },
  { path: '/audit-log', label: 'Audit Log', icon: 'History' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()
  const [expanded, setExpanded] = useState({})
  const logout = useAuthStore(s => s.logout)

  const toggleExpand = (path) => {
    setExpanded(prev => ({ ...prev, [path]: !prev[path] }))
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-surface-card-dark border-r border-border-light dark:border-border-dark z-30 transition-all duration-300 flex flex-col
        ${collapsed ? 'w-[72px]' : 'w-64'}
        max-lg:hidden`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border-light dark:border-border-dark shrink-0">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
          T
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-lg text-gray-900 dark:text-white truncate"
          >
            {ORG_NAME}
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {navItems.map(item => {
          const Icon = iconMap[item.icon]
          const isActive = location.pathname === item.path
          const isExpanded = expanded[item.path]
          const hasChildren = item.children?.length > 0
          const isChildActive = hasChildren && item.children.some(c => location.pathname === c.path)

          return (
            <div key={item.path}>
              {hasChildren ? (
                <button
                  onClick={() => toggleExpand(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-all duration-200
                    ${isChildActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              )}

              {/* Children */}
              <AnimatePresence>
                {hasChildren && isExpanded && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden ml-8 mt-0.5 space-y-0.5"
                  >
                    {item.children.map(child => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-btn text-sm transition-colors
                          ${isActive
                            ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50/50 dark:bg-primary-900/10'
                            : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      {/* Bottom: Collapse + Logout */}
      <div className="border-t border-border-light dark:border-border-dark p-3 space-y-1 shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft size={20} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span>Kecilkan</span>}
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  )
}
