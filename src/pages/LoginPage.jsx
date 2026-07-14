import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/api/client'
import { ORG_NAME } from '@/constants/routes'

const loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore(s => s.login)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await authApi.login(data.username, data.password)
      if (res.success) {
        login(res.data.user, res.data.token)
        toast.success(`Selamat datang, ${res.data.user.nama}!`)
        navigate('/')
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      toast.error('Gagal terhubung ke server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary-300/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/95 dark:bg-surface-card-dark/95 backdrop-blur-2xl rounded-[28px] shadow-2xl p-8 border border-white/20">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-2xl gradient-primary shadow-lg shadow-primary-500/30 flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white text-3xl font-bold">T</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{ORG_NAME}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Sistem Pelaporan Keuangan</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Username"
              leftIcon={User}
              placeholder="Masukkan username"
              autoComplete="username"
              error={errors.username?.message}
              {...register('username')}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                leftIcon={Lock}
                placeholder="Masukkan password"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full py-3 text-base"
            >
              Masuk
            </Button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-btn">
            <p className="text-xs text-primary-700 dark:text-primary-300 text-center">
              <strong>Demo:</strong> Gunakan username <code className="bg-primary-100 dark:bg-primary-800/40 px-1 rounded">ketua</code>, <code className="bg-primary-100 dark:bg-primary-800/40 px-1 rounded">sekretaris</code>, atau <code className="bg-primary-100 dark:bg-primary-800/40 px-1 rounded">bendahara</code> dengan password apapun
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
