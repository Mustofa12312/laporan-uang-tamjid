import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { Settings } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingSystemPage() {
  const handleSave = (e) => {
    e.preventDefault()
    toast.success('Pengaturan sistem disimpan')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-heading text-gray-900 dark:text-white font-bold">Pengaturan Sistem</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Konfigurasi utama aplikasi</p>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Settings size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferensi Sistem</h3>
        </div>
        
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Nama Aplikasi" defaultValue="Sistem Pelaporan Keuangan TAMJID" required />
          <Select label="Format Mata Uang Default" options={[{value: 'IDR', label: 'Rupiah (IDR)'}]} defaultValue="IDR" />
          <Select label="Zona Waktu" options={[{value: 'Asia/Jakarta', label: 'Asia/Jakarta (WIB)'}]} defaultValue="Asia/Jakarta" />
          
          <div className="pt-4">
            <Button type="submit">Simpan Pengaturan</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
