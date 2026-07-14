import { useState } from 'react'
import Card from '@/components/ui/Card'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading text-gray-900 dark:text-white font-bold">Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Wawasan mendalam dan tren keuangan</p>
      </div>

      <Card>
        <div className="text-center py-12">
          <h2 className="text-xl font-bold mb-2">Coming Soon</h2>
          <p className="text-gray-500">Fitur prediksi pengeluaran dan analitik lanjutan akan segera hadir.</p>
        </div>
      </Card>
    </div>
  )
}
