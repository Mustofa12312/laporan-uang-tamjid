import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { auditApi } from '@/api/client'
import { formatDateTime } from '@/utils/date'
import { History, LogIn, Plus, Edit3, Trash2, Download, Printer } from 'lucide-react'

const actionIcons = {
  LOGIN: LogIn, CREATE: Plus, UPDATE: Edit3, DELETE: Trash2, EXPORT: Download, PRINT: Printer,
}
const actionColors = {
  LOGIN: 'neutral', CREATE: 'success', UPDATE: 'warning', DELETE: 'danger', EXPORT: 'primary', PRINT: 'primary',
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = async () => {
    setLoading(true)
    const res = await auditApi.list()
    if (res.success) setLogs(res.data.data)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <History size={24} className="text-primary-600" />
        <div>
          <h1 className="text-heading text-gray-900 dark:text-white font-bold">Audit Log</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Riwayat seluruh aktivitas sistem</p>
        </div>
      </div>

      <Card padding={false}>
        {loading ? (
          <div className="p-5"><SkeletonTable rows={6} cols={5} /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-table">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark">
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Waktu</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Pengguna</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Aksi</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">ID Transaksi</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 dark:text-gray-300">Detail</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => {
                  const Icon = actionIcons[log.aksi] || History
                  return (
                    <tr key={log.id} className="border-b border-border-light dark:border-border-dark hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{formatDateTime(log.tanggal)}</td>
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{log.pengguna}</td>
                      <td className="py-3 px-4">
                        <Badge variant={actionColors[log.aksi] || 'neutral'}>
                          <Icon size={12} className="mr-1" /> {log.aksi}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-500 dark:text-gray-400 font-mono text-xs">{log.idTransaksi || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400 max-w-[300px] truncate">{log.dataBaru || log.dataLama || '-'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
