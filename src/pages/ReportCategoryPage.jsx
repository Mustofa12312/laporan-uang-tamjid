import { useState } from 'react'
import Card from '@/components/ui/Card'

export default function ReportCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading text-gray-900 dark:text-white font-bold">Laporan Per Kategori</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Analisis pengeluaran berdasarkan kategori tertentu</p>
      </div>

      <Card>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Fitur analisis mendalam per kategori sedang dalam tahap pengembangan.</p>
          <p className="text-sm text-gray-400">Untuk ringkasan per kategori bulan ini, silakan lihat di menu Laporan Bulanan.</p>
        </div>
      </Card>
    </div>
  )
}
