import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, PlusCircle, FileText, Menu } from 'lucide-react'

const items = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transaksi', label: 'Transaksi', icon: Receipt },
  { path: '/transaksi/tambah', label: 'Tambah', icon: PlusCircle, isAction: true },
  { path: '/laporan', label: 'Laporan', icon: FileText },
  { path: '/pengaturan', label: 'Lainnya', icon: Menu },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-surface-card-dark/90 backdrop-blur-xl border-t border-border-light dark:border-border-dark lg:hidden safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map(item => {
          const Icon = item.icon

          if (item.isAction) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="-mt-5"
              >
                <div className="w-14 h-14 rounded-full gradient-primary shadow-lg shadow-primary-500/30 flex items-center justify-center text-white active:scale-95 transition-transform">
                  <Icon size={26} />
                </div>
              </NavLink>
            )
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors
                ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`
              }
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
