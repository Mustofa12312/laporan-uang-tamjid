import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalData,
  pageSize,
}) {
  const pages = []
  const maxVisible = 5

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 pt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Menampilkan {((currentPage - 1) * pageSize) + 1}–{Math.min(currentPage * pageSize, totalData)} dari {totalData} data
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-icon disabled:opacity-30"
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft size={18} />
        </button>

        {start > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className="btn-icon text-sm">1</button>
            {start > 2 && <span className="px-1 text-gray-400">…</span>}
          </>
        )}

        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-btn text-sm font-medium transition-colors
              ${p === currentPage
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-1 text-gray-400">…</span>}
            <button onClick={() => onPageChange(totalPages)} className="btn-icon text-sm">{totalPages}</button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-icon disabled:opacity-30"
          aria-label="Halaman selanjutnya"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
