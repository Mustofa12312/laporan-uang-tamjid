import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { categoryApi } from '@/api/client'
import { Plus, Edit3, Trash2, Tag, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [addModal, setAddModal] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    const res = await categoryApi.list()
    if (res.success) setCategories(res.data)
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-heading text-gray-900 dark:text-white font-bold">Pengaturan</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Kelola kategori, pengguna, dan sistem</p>
      </div>

      {/* Categories */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Tag size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kategori</h3>
          </div>
          <Button size="sm" onClick={() => toast('Fitur tambah kategori akan terhubung dengan GAS')}>
            <Plus size={16} /> Tambah
          </Button>
        </div>
        <div className="space-y-2">
          {categories.map(cat => (
            <div key={cat.id} className="flex items-center justify-between p-3 rounded-btn bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="font-medium text-gray-900 dark:text-white">{cat.nama}</span>
                {cat.wajibNota ? (
                  <Badge variant="primary">Wajib Nota</Badge>
                ) : (
                  <Badge variant="warning">Tanpa Nota</Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button className="btn-icon w-8 h-8"><Edit3 size={14} /></button>
                <button className="btn-icon w-8 h-8 text-danger-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Organization Info */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Organisasi</h3>
        <div className="space-y-4">
          <Input label="Nama Organisasi" value="TAMJID" readOnly />
          <Input label="Tahun Aktif" value="2026" readOnly />
          <Input label="Folder Google Drive" value="Bukti Pengeluaran" readOnly />
        </div>
        <p className="text-xs text-gray-400 mt-4">* Pengaturan ini akan dapat diubah setelah terhubung dengan Google Apps Script</p>
      </Card>
    </div>
  )
}
