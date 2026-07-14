import { useState } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { User, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingProfilePage() {
  const user = useAuthStore(s => s.user)
  const [loading, setLoading] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Profil berhasil diperbarui')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-heading text-gray-900 dark:text-white font-bold">Profil Pengguna</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Atur informasi profil dan keamanan akun Anda</p>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-6">
          <User size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informasi Dasar</h3>
        </div>
        
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Nama Lengkap" defaultValue={user?.nama} required />
          <Input label="Username" defaultValue={user?.username} disabled helperText="Username tidak dapat diubah" />
          <Input label="Jabatan" defaultValue={user?.jabatan} disabled helperText="Hubungi administrator untuk mengubah jabatan" />
          
          <div className="pt-4">
            <Button type="submit" loading={loading}>Simpan Profil</Button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Lock size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ubah Password</h3>
        </div>
        
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Password Saat Ini" type="password" required />
          <Input label="Password Baru" type="password" required />
          <Input label="Konfirmasi Password Baru" type="password" required />
          
          <div className="pt-4">
            <Button type="submit" variant="secondary" loading={loading}>Update Password</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
