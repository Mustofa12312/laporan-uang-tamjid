import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, X, Image as ImageIcon, AlertTriangle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import { transactionApi, categoryApi } from '@/api/client'
import { useAuthStore } from '@/store/authStore'
import { formatRupiah } from '@/utils/currency'
import { CATEGORIES_WITHOUT_NOTA, FILE_UPLOAD } from '@/constants/routes'
import toast from 'react-hot-toast'

const transactionSchema = z.object({
  tanggal: z.string().min(1, 'Tanggal wajib diisi'),
  kategori: z.string().min(1, 'Kategori wajib diisi'),
  uraian: z.string().min(1, 'Uraian wajib diisi'),
  volume: z.number({ invalid_type_error: 'Volume harus angka' }).min(1, 'Volume minimal 1'),
  hargaSatuan: z.number({ invalid_type_error: 'Harga harus angka' }).min(1, 'Harga minimal Rp1'),
  nomorNota: z.string().optional(),
})

export default function AddTransactionPage() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      tanggal: new Date().toISOString().split('T')[0],
      kategori: '',
      uraian: '',
      volume: 1,
      hargaSatuan: 0,
      nomorNota: '',
    }
  })

  const watchKategori = watch('kategori')
  const watchVolume = watch('volume')
  const watchHarga = watch('hargaSatuan')
  const total = (watchVolume || 0) * (watchHarga || 0)
  const isNotaOptional = CATEGORIES_WITHOUT_NOTA.includes(watchKategori)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const res = await categoryApi.list()
    if (res.success) setCategories(res.data)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > FILE_UPLOAD.MAX_SIZE) {
      toast.error('Ukuran file melebihi 10MB')
      return
    }

    if (!FILE_UPLOAD.ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Format file tidak didukung')
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    if (imagePreview) URL.revokeObjectURL(imagePreview)
    setImagePreview(null)
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const payload = {
        ...data,
        total,
        statusNota: isNotaOptional && !data.nomorNota ? 'PENGELUARAN TANPA NOTA' : 'ADA',
        emailPenginput: user?.username,
        namaPenginput: user?.nama,
        driveFileId: imageFile ? 'mock-file-id' : '',
        driveUrl: imageFile ? 'https://drive.google.com/mock' : '',
        namaFile: imageFile ? imageFile.name : '',
      }

      const res = await transactionApi.create(payload)
      if (res.success) {
        toast.success('Transaksi berhasil disimpan')
        navigate('/transaksi')
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      toast.error('Gagal menyimpan transaksi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-heading text-gray-900 dark:text-white font-bold">Tambah Transaksi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Catat pengeluaran baru</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Tanggal */}
          <Input
            label="Tanggal"
            type="date"
            error={errors.tanggal?.message}
            required
            {...register('tanggal')}
          />

          {/* Kategori */}
          <Select
            label="Kategori"
            error={errors.kategori?.message}
            required
            options={categories.map(c => ({ value: c.nama, label: c.nama }))}
            {...register('kategori')}
          />

          {/* Nota optional badge */}
          {isNotaOptional && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-3 py-2 bg-warning-50 dark:bg-warning-500/10 rounded-btn"
            >
              <AlertTriangle size={16} className="text-warning-500" />
              <span className="text-sm text-warning-600 dark:text-warning-400">
                PENGELUARAN TANPA NOTA — Bukti & Nomor Nota opsional
              </span>
            </motion.div>
          )}

          {/* Uraian */}
          <Input
            label="Uraian Barang"
            placeholder="Contoh: Kertas HVS A4 80 gram"
            error={errors.uraian?.message}
            required
            {...register('uraian')}
          />

          {/* Volume & Harga */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Volume"
              type="number"
              min={1}
              error={errors.volume?.message}
              required
              {...register('volume', { valueAsNumber: true })}
            />
            <Input
              label="Harga Satuan"
              type="number"
              min={0}
              placeholder="50000"
              error={errors.hargaSatuan?.message}
              required
              {...register('hargaSatuan', { valueAsNumber: true })}
            />
          </div>

          {/* Total (auto-calculated) */}
          <div>
            <label className="label-base">Total</label>
            <div className="input-base bg-gray-50 dark:bg-gray-800 font-bold text-xl text-primary-600 dark:text-primary-400">
              {formatRupiah(total)}
            </div>
          </div>

          {/* Nomor Nota */}
          <Input
            label={`Nomor Nota ${isNotaOptional ? '(Opsional)' : ''}`}
            placeholder="NT-001"
            required={!isNotaOptional}
            {...register('nomorNota')}
          />

          {/* Upload Bukti */}
          <div>
            <label className="label-base">
              Upload Bukti {isNotaOptional ? '(Opsional)' : ''}
              {!isNotaOptional && <span className="text-danger-500 ml-0.5">*</span>}
            </label>
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-preview cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-primary-600 dark:text-primary-400">Pilih file</span> atau drag & drop
                </p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP (Maks. 10MB)</p>
                <input
                  type="file"
                  accept={FILE_UPLOAD.ACCEPTED_EXTENSIONS}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-preview"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-danger-500 text-white flex items-center justify-center shadow-lg hover:bg-danger-600 transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-2 left-2 badge-success">
                  <ImageIcon size={12} className="mr-1" />
                  {(imageFile.size / 1024).toFixed(0)} KB
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border-light dark:border-border-dark">
            <Button variant="secondary" type="button" onClick={() => navigate(-1)} className="flex-1">
              Batal
            </Button>
            <Button type="submit" loading={loading} className="flex-1">
              Simpan Transaksi
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
