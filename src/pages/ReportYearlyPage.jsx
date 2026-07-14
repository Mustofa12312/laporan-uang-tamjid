import { useState } from 'react'
import Card from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatRupiah } from '@/utils/currency'
import { FileDown, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ReportYearlyPage() {
  const [year, setYear] = useState('2026')
  
  // Mock data for yearly
  const data = [
    { month: 'Jan', total: 4500000 },
    { month: 'Feb', total: 5200000 },
    { month: 'Mar', total: 3800000 },
    { month: 'Apr', total: 6100000 },
    { month: 'Mei', total: 4900000 },
    { month: 'Jun', total: 5500000 },
    { month: 'Jul', total: 4200000 },
    { month: 'Ags', total: 0 },
    { month: 'Sep', total: 0 },
    { month: 'Okt', total: 0 },
    { month: 'Nov', total: 0 },
    { month: 'Des', total: 0 },
  ]
  
  const grandTotal = data.reduce((s, d) => s + d.total, 0)
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading text-gray-900 dark:text-white font-bold">Laporan Tahunan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rekap pengeluaran per bulan dalam 1 tahun</p>
        </div>
        <select value={year} onChange={e => setYear(e.target.value)} className="input-base max-w-[120px]">
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-caption text-gray-500 dark:text-gray-400">Total Pengeluaran {year}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{formatRupiah(grandTotal)}</p>
          </div>
          <Button variant="secondary">
            <FileDown size={18} /> Export PDF
          </Button>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
              <YAxis tickFormatter={v => `${(v / 1000000).toFixed(0)}jt`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip formatter={v => [formatRupiah(v), 'Total']} cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="total" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card padding={false}>
        <table className="w-full text-table">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark">
              <th className="py-3 px-5 text-left font-semibold text-gray-600 dark:text-gray-300">Bulan</th>
              <th className="py-3 px-5 text-right font-semibold text-gray-600 dark:text-gray-300">Total Pengeluaran</th>
            </tr>
          </thead>
          <tbody>
            {data.filter(d => d.total > 0).map((d, i) => (
              <tr key={i} className="border-b border-border-light dark:border-border-dark">
                <td className="py-3 px-5 font-medium">{d.month} {year}</td>
                <td className="py-3 px-5 text-right font-semibold">{formatRupiah(d.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
