import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Plus, Edit3, Trash2, Users } from 'lucide-react'

export default function SettingUserPage() {
  const users = [
    { id: 'USR-001', nama: 'Ketua TAMJID', username: 'ketua', jabatan: 'Ketua', status: true },
    { id: 'USR-002', nama: 'Sekretaris TAMJID', username: 'sekretaris', jabatan: 'Sekretaris', status: true },
    { id: 'USR-003', nama: 'Bendahara TAMJID', username: 'bendahara', jabatan: 'Bendahara', status: true },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-heading text-gray-900 dark:text-white font-bold">Manajemen Pengguna</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Kelola akses pengguna ke dalam sistem</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daftar Pengguna</h3>
          </div>
          <Button size="sm">
            <Plus size={16} /> Tambah User
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-table text-left">
            <thead>
              <tr className="border-b border-border-light dark:border-border-dark text-gray-500">
                <th className="py-3 px-4 font-semibold">Nama</th>
                <th className="py-3 px-4 font-semibold">Username</th>
                <th className="py-3 px-4 font-semibold">Jabatan</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{u.nama}</td>
                  <td className="py-3 px-4 text-gray-500">{u.username}</td>
                  <td className="py-3 px-4">{u.jabatan}</td>
                  <td className="py-3 px-4">
                    <Badge variant={u.status ? 'success' : 'neutral'}>{u.status ? 'Aktif' : 'Nonaktif'}</Badge>
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button className="btn-icon w-8 h-8"><Edit3 size={15} /></button>
                    <button className="btn-icon w-8 h-8 text-danger-500"><Trash2 size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
