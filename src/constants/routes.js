export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  TRANSACTIONS: '/transaksi',
  ADD_TRANSACTION: '/transaksi/tambah',
  EDIT_TRANSACTION: '/transaksi/edit/:id',
  REPORT: '/laporan',
  REPORT_MONTHLY: '/laporan/bulanan',
  REPORT_YEARLY: '/laporan/tahunan',
  REPORT_CATEGORY: '/laporan/kategori',
  REPORT_USER: '/laporan/pengguna',
  ANALYTICS: '/analytics',
  EXPORT: '/export',
  AUDIT_LOG: '/audit-log',
  SETTINGS: '/pengaturan',
  SETTINGS_CATEGORY: '/pengaturan/kategori',
  SETTINGS_USER: '/pengaturan/pengguna',
  SETTINGS_PROFILE: '/pengaturan/profil',
  SETTINGS_SYSTEM: '/pengaturan/sistem',
  SYSTEM_STATUS: '/system-status',
}

export const NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: ROUTES.TRANSACTIONS, label: 'Transaksi', icon: 'Receipt' },
  { path: ROUTES.REPORT, label: 'Laporan', icon: 'FileText', children: [
    { path: ROUTES.REPORT_MONTHLY, label: 'Bulanan' },
    { path: ROUTES.REPORT_YEARLY, label: 'Tahunan' },
    { path: ROUTES.REPORT_CATEGORY, label: 'Per Kategori' },
  ]},
  { path: ROUTES.ANALYTICS, label: 'Analytics', icon: 'BarChart3' },
  { path: ROUTES.EXPORT, label: 'Export', icon: 'Download' },
  { path: ROUTES.SETTINGS, label: 'Pengaturan', icon: 'Settings', children: [
    { path: ROUTES.SETTINGS_CATEGORY, label: 'Kategori' },
    { path: ROUTES.SETTINGS_USER, label: 'Pengguna' },
    { path: ROUTES.SETTINGS_PROFILE, label: 'Profil' },
    { path: ROUTES.SETTINGS_SYSTEM, label: 'Sistem' },
  ]},
  { path: ROUTES.AUDIT_LOG, label: 'Audit Log', icon: 'History' },
]

export const BOTTOM_NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: ROUTES.TRANSACTIONS, label: 'Transaksi', icon: 'Receipt' },
  { path: ROUTES.ADD_TRANSACTION, label: 'Tambah', icon: 'PlusCircle', isAction: true },
  { path: ROUTES.REPORT, label: 'Laporan', icon: 'FileText' },
  { path: ROUTES.SETTINGS, label: 'Lainnya', icon: 'Menu' },
]

export const CATEGORIES_WITHOUT_NOTA = ['Transport', 'Insentif & Bisyaroh', 'Lain-lain']

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  TARGET_SIZE: 500 * 1024, // 500KB
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ACCEPTED_EXTENSIONS: '.jpg,.jpeg,.png,.webp',
}

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
}

export const ORG_NAME = 'TAMJID'
