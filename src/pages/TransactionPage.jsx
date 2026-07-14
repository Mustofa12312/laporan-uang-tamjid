import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, Filter, Plus, Eye, Edit3, Trash2,
  ChevronUp, ChevronDown, FileImage, AlertCircle
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Drawer from '@/components/ui/Drawer'
import Pagination from '@/components/ui/Pagination'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { transactionApi, categoryApi } from '@/api/client'
import { formatRupiah } from '@/utils/currency'
import { formatDate } from '@/utils/date'
import toast from 'react-hot-toast'

export default function TransactionPage() {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [totalNominal, setTotalNominal] = useState(0)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortField, setSortField] = useState('tanggal')
  const [sortOrder, setSortOrder] = useState('desc')
  const [deleteModal, setDeleteModal] = useState(null)
  const [detailDrawer, setDetailDrawer] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const pageSize = 20

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadTransactions()
  }, [page, search, categoryFilter, sortField, sortOrder])

  const loadCategories = async () => {
    const res = await categoryApi.list()
    if (res.success) setCategories(res.data)
  }

  const loadTransactions = async () => {
    setLoading(true)
    try {
      const res = await transactionApi.list({
        page, pageSize, search,
        category: categoryFilter,
        sort: sortField, order: sortOrder
      })
      if (res.success) {
        setTransactions(res.data.data)
        setTotalPages(res.data.totalHalaman)
        setTotalData(res.data.totalData)
        setTotalNominal(res.data.totalNominal)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const handleDelete = async () => {
    if (!deleteModal) return
    setDeleting(true)
    try {
      const res = await transactionApi.delete(deleteModal.id)
      if (res.success) {
        toast.success('Transaksi berhasil dihapus')
        setDeleteModal(null)
        loadTransactions()
      }
    } finally {
      setDeleting(false)
    }
  }

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown size={14} className="opacity-30" />
    return sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  const columns = [
    { key: 'tanggal', label: 'Tanggal', sortable: true },
    { key: 'kategori', label: 'Kategori', sortable: true },
    { key: 'uraian', label: 'Uraian', sortable: false },
    { key: 'volume', label: 'Vol', sortable: false, className: 'text-right' },
    { key: 'hargaSatuan', label: 'Harga', sortable: false, className: 'text-right' },
    { key: 'total', label: 'Total', sortable: true, className: 'text-right' },
    { key: 'statusNota', label: 'Nota', sortable: false },
    { key: 'namaPenginput', label: 'Penginput', sortable: false },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-heading text-gray-900 dark:text-white font-bold">Transaksi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalData} transaksi • Total: {formatRupiah(totalNominal)}
          </p>
        </div>
        <Button onClick={() => navigate('/transaksi/tambah')}>
          <Plus size={18} />
          Tambah Transaksi
        </Button>
      </div>

      {/* Filters */}
      <Card padding={false} className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Cari uraian, nota, penginput..."
              className="input-base pl-10"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={e => { setCategoryFilter(e.target.value); setPage(1) }}
            className="input-base max-w-[200px]"
          >
            <option value="">Semua Kategori</option>
            {categories.map(c => (
              <option key={c.id} value={c.nama}>{c.nama}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card padding={false} className="overflow-hidden">
        {loading ? (
          <div className="p-5">
            <SkeletonTable rows={8} cols={8} />
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Tidak ada transaksi</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              {search ? 'Coba ubah kata kunci pencarian' : 'Belum ada transaksi pada periode ini'}
            </p>
            {!search && (
              <Button onClick={() => navigate('/transaksi/tambah')} className="mt-4">
                <Plus size={18} />
                Tambah Transaksi
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-table">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-border-light dark:border-border-dark">
                  <th className="py-3 px-4 text-left font-semibold text-gray-600 dark:text-gray-300 w-10">#</th>
                  {columns.map(col => (
                    <th
                      key={col.key}
                      className={`py-3 px-4 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap ${col.className || 'text-left'} ${col.sortable ? 'cursor-pointer select-none hover:text-gray-900 dark:hover:text-white' : ''}`}
                      onClick={() => col.sortable && handleSort(col.key)}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {col.sortable && <SortIcon field={col.key} />}
                      </span>
                    </th>
                  ))}
                  <th className="py-3 px-4 text-center font-semibold text-gray-600 dark:text-gray-300">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx, idx) => (
                  <motion.tr
                    key={trx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="border-b border-border-light dark:border-border-dark hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
                    onClick={() => setDetailDrawer(trx)}
                  >
                    <td className="py-3 px-4 text-gray-500">{(page - 1) * pageSize + idx + 1}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{formatDate(trx.tanggal, 'd MMM yy')}</td>
                    <td className="py-3 px-4">
                      <Badge variant={trx.statusNota === 'ADA' ? 'primary' : 'warning'}>
                        {trx.kategori}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 max-w-[200px] truncate">{trx.uraian}</td>
                    <td className="py-3 px-4 text-right">{trx.volume}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">{formatRupiah(trx.hargaSatuan)}</td>
                    <td className="py-3 px-4 text-right font-semibold whitespace-nowrap">{formatRupiah(trx.total)}</td>
                    <td className="py-3 px-4">
                      {trx.statusNota === 'ADA' ? (
                        <span className="inline-flex items-center gap-1 text-success-500">
                          <FileImage size={14} />
                          <span className="text-xs">Ada</span>
                        </span>
                      ) : (
                        <span className="text-xs text-warning-500">Tanpa Nota</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{trx.namaPenginput}</td>
                    <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setDetailDrawer(trx)} className="btn-icon w-8 h-8" title="Detail">
                          <Eye size={15} />
                        </button>
                        <button onClick={() => navigate(`/transaksi/edit/${trx.id}`)} className="btn-icon w-8 h-8" title="Edit">
                          <Edit3 size={15} />
                        </button>
                        <button onClick={() => setDeleteModal(trx)} className="btn-icon w-8 h-8 text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10" title="Hapus">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 dark:bg-gray-800/50 font-semibold">
                  <td colSpan={6} className="py-3 px-4 text-right">Total:</td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">{formatRupiah(totalNominal)}</td>
                  <td colSpan={3} />
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="px-4 pb-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalData={totalData}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Hapus Transaksi" size="sm">
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-danger-100 dark:bg-danger-500/20 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={28} className="text-danger-500" />
          </div>
          <p className="text-gray-900 dark:text-white font-medium mb-1">Apakah Anda yakin?</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Transaksi <strong>{deleteModal?.uraian}</strong> akan dihapus permanen
          </p>
        </div>
        <div className="flex gap-3 pt-4 border-t border-border-light dark:border-border-dark">
          <Button variant="secondary" onClick={() => setDeleteModal(null)} className="flex-1">
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete} loading={deleting} className="flex-1">
            Hapus
          </Button>
        </div>
      </Modal>

      {/* Detail Drawer */}
      <Drawer isOpen={!!detailDrawer} onClose={() => setDetailDrawer(null)} title="Detail Transaksi">
        {detailDrawer && (
          <div className="space-y-5">
            {/* Image placeholder */}
            {detailDrawer.driveUrl ? (
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-preview flex items-center justify-center">
                <FileImage size={48} className="text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">Bukti Transaksi</span>
              </div>
            ) : (
              <div className="p-4 bg-warning-50 dark:bg-warning-500/10 rounded-preview text-center">
                <Badge variant="warning">PENGELUARAN TANPA NOTA</Badge>
              </div>
            )}

            {/* Info grid */}
            <div className="space-y-3">
              {[
                ['ID', detailDrawer.id],
                ['Tanggal', formatDate(detailDrawer.tanggal, 'd MMMM yyyy')],
                ['Kategori', detailDrawer.kategori],
                ['Uraian', detailDrawer.uraian],
                ['Volume', detailDrawer.volume],
                ['Harga Satuan', formatRupiah(detailDrawer.hargaSatuan)],
                ['Total', formatRupiah(detailDrawer.total)],
                ['Nomor Nota', detailDrawer.nomorNota || '-'],
                ['Penginput', detailDrawer.namaPenginput],
                ['Dibuat', formatDate(detailDrawer.tanggalDibuat, 'd MMM yyyy HH:mm')],
                ['Terakhir Diubah', formatDate(detailDrawer.tanggalDiubah, 'd MMM yyyy HH:mm')],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border-light dark:border-border-dark last:border-0">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" onClick={() => { setDetailDrawer(null); navigate(`/transaksi/edit/${detailDrawer.id}`) }} className="flex-1">
                <Edit3 size={16} /> Edit
              </Button>
              <Button variant="danger" onClick={() => { setDetailDrawer(null); setDeleteModal(detailDrawer) }} className="flex-1">
                <Trash2 size={16} /> Hapus
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}
