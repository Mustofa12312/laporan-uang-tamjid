import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, X, Image as ImageIcon, AlertTriangle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
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

export default function EditTransactionPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(true)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [existingImageUrl, setExistingImageUrl] = useState(null)

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
  })

  const watchKategori = watch('kategori')
  const watchVolume = watch('volume')
  const watchHarga = watch('hargaSatuan')
  const total = (watchVolume || 0) * (watchHarga || 0)
  const isNotaOptional = CATEGORIES_WITHOUT_NOTA.includes(watchKategori)

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    setInitLoading(true)
    try {
      const [catRes, trxRes] = await Promise.all([
        categoryApi.list(),
        transactionApi.get(id)
      ])

      if (catRes.success) setCategories(catRes.data)
      if (trxRes.success) {
        const trx = trxRes.data
        reset({
          tanggal: trx.tanggal,
          kategori: trx.kategori,
          uraian: trx.uraian,
          volume: trx.volume,
          hargaSatuan: trx.hargaSatuan,
          nomorNota: trx.nomorNota || '',
        })
        if (trx.driveUrl) {
          setExistingImageUrl(trx.driveUrl)
        }
      } else {
        toast.error('Transaksi tidak ditemukan')
        navigate('/transaksi')
      }
    } catch (err) {
      toast.error('Gagal memuat data')
    } finally {
      setInitLoading(false)
    }
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
    setImagePreview(null)
    setExistingImageUrl(null)
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const payload = {
        ...data,
        total,
        statusNota: isNotaOptional && !data.nomorNota ? 'PENGELUARAN TANPA NOTA' : 'ADA',
        namaPenginput: user?.nama,
        // If imageFile exists, it means user uploaded a new one. 
        // If it doesn't but existingImageUrl exists, it means keep old one.
      }

      const res = await transactionApi.update(id, payload)
      if (res.success) {
        toast.success('Transaksi berhasil diperbarui')
        navigate('/transaksi')
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      toast.error('Gagal memperbarui transaksi')
    } finally {
      setLoading(false)
    }
  }

  if (initLoading) {
    return <div className="p-8 text-center text-gray-500">Memuat data...</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-heading text-gray-900 dark:text-white font-bold">Edit Transaksi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{id}</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input label="Tanggal" type="date" error={errors.tanggal?.message} required {...register('tanggal')} />
          <Select label="Kategori" error={errors.kategori?.message} required options={categories.map(c => ({ value: c.nama, label: c.nama }))} {...register('kategori')} />
          
          {isNotaOptional && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-3 py-2 bg-warning-50 dark:bg-warning-500/10 rounded-btn">
              <AlertTriangle size={16} className="text-warning-500" />
              <span className="text-sm text-warning-600 dark:text-warning-400">PENGELUARAN TANPA NOTA — Bukti & Nomor Nota opsional</span>
            </motion.div>
          )}

          <Input label="Uraian Barang" error={errors.uraian?.message} required {...register('uraian')} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Volume" type="number" min={1} error={errors.volume?.message} required {...register('volume', { valueAsNumber: true })} />
            <Input label="Harga Satuan" type="number" min={0} error={errors.hargaSatuan?.message} required {...register('hargaSatuan', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="label-base">Total</label>
            <div className="input-base bg-gray-50 dark:bg-gray-800 font-bold text-xl text-primary-600 dark:text-primary-400">{formatRupiah(total)}</div>
          </div>

          <Input label={`Nomor Nota ${isNotaOptional ? '(Opsional)' : ''}`} required={!isNotaOptional} {...register('nomorNota')} />

          <div>
            <label className="label-base">
              Upload Bukti {isNotaOptional ? '(Opsional)' : ''}
              {!isNotaOptional && <span className="text-danger-500 ml-0.5">*</span>}
            </label>
            {!(imagePreview || existingImageUrl) ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-preview cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Pilih file baru</p>
                <input type="file" accept={FILE_UPLOAD.ACCEPTED_EXTENSIONS} onChange={handleImageChange} className="hidden" />
              </label>
            ) : (
              <div className="relative">
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-preview flex items-center justify-center overflow-hidden">
                   {imagePreview ? (
                     <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                   ) : (
                     <div className="text-center text-gray-500">
                       <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                       <span className="text-sm">Gambar dari Google Drive</span>
                     </div>
                   )}
                </div>
                <button type="button" onClick={removeImage} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-danger-500 text-white flex items-center justify-center shadow-lg hover:bg-danger-600 transition-colors">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-border-light dark:border-border-dark">
            <Button variant="secondary" type="button" onClick={() => navigate(-1)} className="flex-1">Batal</Button>
            <Button type="submit" loading={loading} className="flex-1">Simpan Perubahan</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
