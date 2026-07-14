import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { FileDown, FileSpreadsheet, FileText as FileCSV, Printer } from 'lucide-react'

export default function ExportPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-heading text-gray-900 dark:text-white font-bold">Export Data</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Unduh seluruh data ke berbagai format</p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Pilih Format Export</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-border-light dark:border-border-dark rounded-xl p-5 hover:border-danger-500 transition-colors cursor-pointer group">
            <FileDown size={32} className="text-danger-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white">PDF Document</h4>
            <p className="text-sm text-gray-500 mt-1">Laporan resmi siap cetak dengan kop surat dan tanda tangan.</p>
          </div>
          
          <div className="border border-border-light dark:border-border-dark rounded-xl p-5 hover:border-success-500 transition-colors cursor-pointer group">
            <FileSpreadsheet size={32} className="text-success-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Excel Workbook (.xlsx)</h4>
            <p className="text-sm text-gray-500 mt-1">Data mentah beserta rumus untuk analisis lebih lanjut.</p>
          </div>
          
          <div className="border border-border-light dark:border-border-dark rounded-xl p-5 hover:border-primary-500 transition-colors cursor-pointer group">
            <FileCSV size={32} className="text-primary-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white">CSV File</h4>
            <p className="text-sm text-gray-500 mt-1">Format ringan untuk integrasi dengan sistem lain.</p>
          </div>
          
          <div className="border border-border-light dark:border-border-dark rounded-xl p-5 hover:border-violet-500 transition-colors cursor-pointer group">
            <Printer size={32} className="text-violet-500 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Print Langsung</h4>
            <p className="text-sm text-gray-500 mt-1">Cetak laporan saat ini ke printer melalui browser.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
