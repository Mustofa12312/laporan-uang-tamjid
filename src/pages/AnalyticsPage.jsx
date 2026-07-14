import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts'
import { Calendar, TrendingUp, Tag, Wallet } from 'lucide-react'
import Card from '@/components/ui/Card'
import { formatRupiah } from '@/utils/currency'
import { SkeletonCard, SkeletonChart } from '@/components/ui/Skeleton'
import { analyticsApi } from '@/api/client'

const CHART_COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316']

export default function AnalyticsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [year, setYear] = useState('2026')

  useEffect(() => {
    loadAnalytics()
  }, [year])

  const loadAnalytics = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      const res = await analyticsApi.getYearly(year)
      if (res.success) {
        setData(res.data)
      } else {
        setErrorMsg(res.message || 'Error tidak diketahui')
      }
    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3].map(i => <SkeletonCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 gap-4">
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gagal Memuat Analitik</h2>
        <p className="text-gray-500 max-w-md">Pesan Error dari Server:</p>
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-200 dark:border-red-800 font-mono text-sm max-w-lg break-words">
          {errorMsg}
        </div>
        <button onClick={loadAnalytics} className="btn-primary mt-4">Coba Lagi</button>
      </div>
    )
  }

  const kpiCards = [
    { title: 'Total Pengeluaran Tahun ' + year, value: formatRupiah(data.totalTahunan), icon: Wallet, color: 'from-primary-500 to-primary-600' },
    { title: 'Rata-rata Bulanan', value: formatRupiah(data.rataRataBulanan), icon: TrendingUp, color: 'from-cyan-500 to-cyan-600' },
    { title: 'Kategori Terbesar', value: data.kategoriTerbesar?.name || '-', subtitle: formatRupiah(data.kategoriTerbesar?.value), icon: Tag, color: 'from-pink-500 to-pink-600' }
  ]

  const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-dashboard-title text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Wawasan mendalam dan tren keuangan tahunan</p>
        </div>
        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className="input-base max-w-[120px]"
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <motion.div key={idx} variants={fadeUp}>
              <Card hover className="relative overflow-hidden group h-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-caption text-gray-500 dark:text-gray-400 font-medium">{kpi.title}</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">{kpi.value}</p>
                    {kpi.subtitle && (
                      <p className="text-caption text-gray-500 dark:text-gray-400 mt-0.5">{kpi.subtitle}</p>
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br ${kpi.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Trend Tahunan - Line Chart */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Perkembangan Pengeluaran Bulanan</h3>
        </div>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trendBulanan} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={v => `${(v / 1000000).toFixed(0)}jt`} axisLine={false} tickLine={false} />
              <RechartsTooltip formatter={(value) => [formatRupiah(value), 'Total']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={3} fill="url(#colorTotal)" dot={{ fill: '#2563EB', r: 4, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Komparasi & Distribusi Kategori */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Perbandingan Kategori</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.categoryBreakdown} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6B7280' }} tickFormatter={v => `${(v / 1000000).toFixed(0)}jt`} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#374151' }} width={110} axisLine={false} tickLine={false} />
                <RechartsTooltip formatter={(value) => [formatRupiah(value), 'Total']} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Persentase Pengeluaran</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.categoryBreakdown.map((entry, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [formatRupiah(value)]} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ fontSize: 13, paddingTop: '20px' }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
