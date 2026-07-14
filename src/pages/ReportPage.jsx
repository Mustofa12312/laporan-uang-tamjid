import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatRupiah } from '@/utils/currency'
import { formatDate, getMonthsList } from '@/utils/date'
import { transactionApi } from '@/api/client'
import {
  FileDown, FileSpreadsheet, FileText as FileCSV, Printer,
  Filter, Calendar
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'

const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316']

export default function ReportPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState('2026-07')

  useEffect(() => {
    loadData()
  }, [selectedMonth])

  const loadData = async () => {
    setLoading(true)
    const res = await transactionApi.list({ pageSize: 1000 })
    if (res.success) {
      const trx = res.data.data
      const categoryMap = {}
      trx.forEach(t => {
        categoryMap[t.kategori] = (categoryMap[t.kategori] || 0) + t.total
      })
      setData({
        transactions: trx,
        total: trx.reduce((s, t) => s + t.total, 0),
        count: trx.length,
        categoryBreakdown: Object.entries(categoryMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
      })
    }
    setLoading(false)
  }

  const handleExport = (type) => {
    // Placeholder - will integrate with actual export in GAS
    const msg = {
      pdf: 'PDF berhasil dibuat',
      excel: 'Excel berhasil dibuat',
      csv: 'CSV berhasil dibuat',
    }
    // In production, this would call the GAS export endpoint
    alert(`Export ${type.toUpperCase()} - Fitur ini akan terhubung dengan Google Apps Script`)
  }

  if (loading || !data) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-card animate-pulse" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading text-gray-900 dark:text-white font-bold">Laporan Keuangan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rekap dan export laporan</p>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-caption text-gray-500 dark:text-gray-400">Total Pengeluaran</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatRupiah(data.total)}</p>
        </Card>
        <Card>
          <p className="text-caption text-gray-500 dark:text-gray-400">Jumlah Transaksi</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{data.count}</p>
        </Card>
        <Card>
          <p className="text-caption text-gray-500 dark:text-gray-400">Rata-rata per Transaksi</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatRupiah(Math.round(data.total / data.count))}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Per Kategori</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.categoryBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" horizontal={false} />
                <XAxis type="number" tickFormatter={v => `${(v / 1000000).toFixed(1)}jt`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={120} />
                <Tooltip formatter={v => [formatRupiah(v)]} contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {data.categoryBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distribusi</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.categoryBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {data.categoryBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={v => [formatRupiah(v)]} contentStyle={{ borderRadius: 14, border: 'none' }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category breakdown table */}
      <Card padding={false}>
        <div className="p-5 border-b border-border-light dark:border-border-dark">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rekap Per Kategori</h3>
        </div>
        <table className="w-full text-table">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="py-3 px-5 text-left font-semibold text-gray-600 dark:text-gray-300">Kategori</th>
              <th className="py-3 px-5 text-right font-semibold text-gray-600 dark:text-gray-300">Jumlah</th>
              <th className="py-3 px-5 text-right font-semibold text-gray-600 dark:text-gray-300">Total</th>
              <th className="py-3 px-5 text-right font-semibold text-gray-600 dark:text-gray-300">Persentase</th>
            </tr>
          </thead>
          <tbody>
            {data.categoryBreakdown.map((cat, i) => (
              <tr key={cat.name} className="border-b border-border-light dark:border-border-dark">
                <td className="py-3 px-5 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  {cat.name}
                </td>
                <td className="py-3 px-5 text-right">{data.transactions.filter(t => t.kategori === cat.name).length}</td>
                <td className="py-3 px-5 text-right font-semibold">{formatRupiah(cat.value)}</td>
                <td className="py-3 px-5 text-right">{((cat.value / data.total) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 dark:bg-gray-800/50 font-semibold">
              <td className="py-3 px-5">Total</td>
              <td className="py-3 px-5 text-right">{data.count}</td>
              <td className="py-3 px-5 text-right">{formatRupiah(data.total)}</td>
              <td className="py-3 px-5 text-right">100%</td>
            </tr>
          </tfoot>
        </table>
      </Card>

      {/* Export Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Laporan</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="secondary" onClick={() => handleExport('pdf')} className="flex-col py-4 h-auto">
            <FileDown size={24} className="text-danger-500 mb-1" />
            <span>PDF</span>
          </Button>
          <Button variant="secondary" onClick={() => handleExport('excel')} className="flex-col py-4 h-auto">
            <FileSpreadsheet size={24} className="text-success-500 mb-1" />
            <span>Excel</span>
          </Button>
          <Button variant="secondary" onClick={() => handleExport('csv')} className="flex-col py-4 h-auto">
            <FileCSV size={24} className="text-primary-500 mb-1" />
            <span>CSV</span>
          </Button>
          <Button variant="secondary" onClick={() => window.print()} className="flex-col py-4 h-auto">
            <Printer size={24} className="text-violet-500 mb-1" />
            <span>Print</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
