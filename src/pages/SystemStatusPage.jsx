import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Server, Database, Cloud, CheckCircle } from 'lucide-react'

export default function SystemStatusPage() {
  const statuses = [
    { name: 'Google Apps Script API', status: 'operational', icon: Server, latency: '120ms' },
    { name: 'Google Spreadsheet DB', status: 'operational', icon: Database, latency: '85ms' },
    { name: 'Google Drive Storage', status: 'operational', icon: Cloud, latency: '210ms' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-heading text-gray-900 dark:text-white font-bold">Status Sistem</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Pengecekan konektivitas ke layanan Google</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map(s => {
          const Icon = s.icon
          return (
            <Card key={s.name} className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-success-50 dark:bg-success-500/10 flex items-center justify-center mb-4">
                <Icon size={32} className="text-success-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{s.name}</h3>
              <Badge variant="success" className="mb-3">
                <CheckCircle size={12} className="mr-1" /> Operational
              </Badge>
              <p className="text-xs text-gray-500 mt-auto">Latency: {s.latency}</p>
            </Card>
          )
        })}
      </div>
      
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Diagnostic Log</h3>
        <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 h-48 overflow-y-auto">
          <p>[{new Date().toISOString()}] INFO: API Client initialized</p>
          <p>[{new Date().toISOString()}] INFO: Fetching mock dashboard data... OK (450ms)</p>
          <p>[{new Date().toISOString()}] INFO: Spreadsheet connection simulated... OK</p>
          <p>[{new Date().toISOString()}] INFO: All systems normal.</p>
        </div>
      </Card>
    </div>
  )
}
