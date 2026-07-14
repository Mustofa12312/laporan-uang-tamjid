import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet, ShoppingCart, TrendingUp, TrendingDown, Calendar,
  Users, Tag, ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { SkeletonCard, SkeletonChart } from '@/components/ui/Skeleton'
import { dashboardApi } from '@/api/client'
import { formatRupiah, formatNumber, calcPercentageChange } from '@/utils/currency'
import { formatDate, formatDateTime, getMonthsList } from '@/utils/date'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts'

const CHART_COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316']

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState('2026-07')

  useEffect(() => {
    loadDashboard()
  }, [selectedMonth])

  const loadDashboard = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const res = await dashboardApi.get(selectedMonth)
      if (res.success) {
        setData(res.data)
      } else {
        setErrorMsg(res.message || 'Error tidak diketahui dari server')
      }
    } catch (err) {
      setErrorMsg(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const pctChange = data ? calcPercentageChange(data.totalBulanIni, data.totalBulanLalu) : null

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => <SkeletonCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-danger-100 text-danger-500 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gagal Memuat Data</h2>
        <p className="text-gray-500 max-w-md">Pesan Error dari Server:</p>
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-200 dark:border-red-800 font-mono text-sm max-w-lg break-words">
          {errorMsg}
        </div>
        <button onClick={loadDashboard} className="btn-primary mt-4">Coba Lagi</button>
      </div>
    )
  }
  const kpiCards = [
    { title: 'Total Pengeluaran', value: formatRupiah(data.totalBulanIni), icon: Wallet, color: 'from-primary-500 to-primary-600', change: pctChange },
    { title: 'Hari Ini', value: formatRupiah(data.totalHariIni), icon: Calendar, color: 'from-emerald-500 to-emerald-600' },
    { title: 'Minggu Ini', value: formatRupiah(data.totalMingguIni), icon: TrendingUp, color: 'from-violet-500 to-violet-600' },
    { title: 'Jumlah Transaksi', value: formatNumber(data.jumlahTransaksi), icon: ShoppingCart, color: 'from-orange-500 to-orange-600' },
    { title: 'Rata-rata Harian', value: formatRupiah(data.rataRataHarian), icon: TrendingUp, color: 'from-cyan-500 to-cyan-600' },
    { title: 'Kategori Terbesar', value: data.kategoriTerbesar?.name || '-', subtitle: formatRupiah(data.kategoriTerbesar?.value), icon: Tag, color: 'from-pink-500 to-pink-600' },
    { title: 'Pengguna Teraktif', value: data.penggunaTeraktif?.name || '-', subtitle: `${data.penggunaTeraktif?.count || 0} transaksi`, icon: Users, color: 'from-amber-500 to-amber-600' },
    { title: 'Selisih Bulan Lalu', value: formatRupiah(Math.abs(data.selisihBulanLalu)), icon: data.selisihBulanLalu >= 0 ? TrendingUp : TrendingDown, color: data.selisihBulanLalu >= 0 ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600', isUp: data.selisihBulanLalu >= 0 },
  ]

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-dashboard-title text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Ringkasan keuangan bulan ini</p>
        </div>
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="input-base max-w-[200px]"
        >
          {getMonthsList(2026).map(m => (
            <option key={m.value} value={m.value}>{m.label} 2026</option>
          ))}
        </select>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <motion.div key={idx} variants={fadeUp}>
              <Card hover className="relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-caption text-gray-500 dark:text-gray-400 font-medium">{kpi.title}</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">{kpi.value}</p>
                    {kpi.subtitle && (
                      <p className="text-caption text-gray-500 dark:text-gray-400 mt-0.5">{kpi.subtitle}</p>
                    )}
                    {kpi.change && (
                      <div className={`flex items-center gap-1 mt-1.5 ${kpi.change.isPositive ? 'text-danger-500' : 'text-success-500'}`}>
                        {kpi.change.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span className="text-xs font-medium">{kpi.change.value}%</span>
                        <span className="text-xs text-gray-400">vs bulan lalu</span>
                      </div>
                    )}
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} />
                  </div>
                </div>
                {/* Decorative */}
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${kpi.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts Row 1 - Line Chart Full Width */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tren Pengeluaran Harian</h3>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.dailyTrend}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-gray-500" />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${(v / 1000000).toFixed(1)}jt`} className="text-gray-500" />
              <Tooltip
                formatter={(value) => [formatRupiah(value), 'Total']}
                contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2.5} fill="url(#colorTotal)" dot={{ fill: '#2563EB', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Charts Row 2 - Bar + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Per Kategori</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.categoryBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000000).toFixed(1)}jt`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={120} />
                <Tooltip formatter={(value) => [formatRupiah(value), 'Total']} contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {data.categoryBreakdown.map((entry, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distribusi Pengeluaran</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.categoryBreakdown.map((entry, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatRupiah(value)]} contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Transactions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Transactions */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaksi Terbaru</h3>
            <Badge variant="neutral">{(data.recentTransactions || []).length}</Badge>
          </div>
          <div className="space-y-3">
            {(data.recentTransactions || []).slice(0, 8).map(trx => (
              <div key={trx.id} className="flex items-center gap-3 p-2.5 rounded-btn hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                  <ShoppingCart size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{trx.uraian}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{trx.kategori} • {formatDate(trx.tanggal, 'd MMM')}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white shrink-0">{formatRupiah(trx.total)}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Aktivitas Terbaru</h3>
            <Clock size={18} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {(data.recentActivities || []).slice(0, 8).map(act => (
              <div key={act.id} className="flex items-start gap-3 p-2.5">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  act.aksi === 'CREATE' ? 'bg-success-500' :
                  act.aksi === 'UPDATE' ? 'bg-warning-500' :
                  act.aksi === 'DELETE' ? 'bg-danger-500' :
                  act.aksi === 'EXPORT' ? 'bg-primary-500' :
                  'bg-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{act.pengguna}</span>{' '}
                    <span className="text-gray-500 dark:text-gray-400">
                      {act.aksi === 'CREATE' && 'menambah transaksi'}
                      {act.aksi === 'UPDATE' && 'mengubah transaksi'}
                      {act.aksi === 'DELETE' && 'menghapus transaksi'}
                      {act.aksi === 'LOGIN' && 'login ke sistem'}
                      {act.aksi === 'EXPORT' && 'mengekspor laporan'}
                    </span>
                  </p>
                  {act.dataBaru && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{act.dataBaru}</p>}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{formatDateTime(act.tanggal)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
