/**
 * Mock Data for development
 * This simulates Google Spreadsheet data structure
 */

// === USERS ===
export const MOCK_USERS = [
  { id: 'USR-001', nama: 'Ahmad Fauzi', username: 'ketua', passwordHash: 'hashed', jabatan: 'Ketua', statusAktif: true, tanggalDibuat: '2026-01-01', terakhirLogin: '2026-07-14T08:00:00' },
  { id: 'USR-002', nama: 'Siti Aminah', username: 'sekretaris', passwordHash: 'hashed', jabatan: 'Sekretaris', statusAktif: true, tanggalDibuat: '2026-01-01', terakhirLogin: '2026-07-14T07:30:00' },
  { id: 'USR-003', nama: 'Muhammad Rizki', username: 'bendahara', passwordHash: 'hashed', jabatan: 'Bendahara', statusAktif: true, tanggalDibuat: '2026-01-01', terakhirLogin: '2026-07-13T15:00:00' },
]

// === CATEGORIES ===
export const MOCK_CATEGORIES = [
  { id: 'CAT-001', nama: 'ATK', wajibNota: true, statusAktif: true, urutan: 1 },
  { id: 'CAT-002', nama: 'Konsumsi', wajibNota: true, statusAktif: true, urutan: 2 },
  { id: 'CAT-003', nama: 'Transport', wajibNota: false, statusAktif: true, urutan: 3 },
  { id: 'CAT-004', nama: 'Insentif & Bisyaroh', wajibNota: false, statusAktif: true, urutan: 4 },
  { id: 'CAT-005', nama: 'Perlengkapan', wajibNota: true, statusAktif: true, urutan: 5 },
  { id: 'CAT-006', nama: 'Cetak & Fotokopi', wajibNota: true, statusAktif: true, urutan: 6 },
  { id: 'CAT-007', nama: 'Lain-lain', wajibNota: false, statusAktif: true, urutan: 7 },
  { id: 'CAT-008', nama: 'Listrik & Air', wajibNota: true, statusAktif: true, urutan: 8 },
]

// === TRANSACTIONS (July 2026) ===
export const MOCK_TRANSACTIONS = [
  { id: 'TRX-202607-000001', tanggal: '2026-07-01', kategori: 'ATK', uraian: 'Kertas HVS A4 80 gram', volume: 5, hargaSatuan: 55000, total: 275000, nomorNota: 'NT-001', statusNota: 'ADA', driveFileId: 'file1', driveUrl: 'https://drive.google.com/file1', namaFile: 'TRX-202607-000001.jpg', emailPenginput: 'bendahara', namaPenginput: 'Muhammad Rizki', tanggalDibuat: '2026-07-01T08:30:00', tanggalDiubah: '2026-07-01T08:30:00', terakhirDiubahOleh: 'Muhammad Rizki', status: 'ACTIVE' },
  { id: 'TRX-202607-000002', tanggal: '2026-07-01', kategori: 'Konsumsi', uraian: 'Snack rapat bulanan', volume: 30, hargaSatuan: 15000, total: 450000, nomorNota: 'NT-002', statusNota: 'ADA', driveFileId: 'file2', driveUrl: 'https://drive.google.com/file2', namaFile: 'TRX-202607-000002.jpg', emailPenginput: 'sekretaris', namaPenginput: 'Siti Aminah', tanggalDibuat: '2026-07-01T09:15:00', tanggalDiubah: '2026-07-01T09:15:00', terakhirDiubahOleh: 'Siti Aminah', status: 'ACTIVE' },
  { id: 'TRX-202607-000003', tanggal: '2026-07-02', kategori: 'Transport', uraian: 'Bensin koordinasi ke kecamatan', volume: 1, hargaSatuan: 75000, total: 75000, nomorNota: '', statusNota: 'PENGELUARAN TANPA NOTA', driveFileId: '', driveUrl: '', namaFile: '', emailPenginput: 'ketua', namaPenginput: 'Ahmad Fauzi', tanggalDibuat: '2026-07-02T10:00:00', tanggalDiubah: '2026-07-02T10:00:00', terakhirDiubahOleh: 'Ahmad Fauzi', status: 'ACTIVE' },
  { id: 'TRX-202607-000004', tanggal: '2026-07-03', kategori: 'Insentif & Bisyaroh', uraian: 'Bisyaroh pengajar Al-Quran', volume: 4, hargaSatuan: 500000, total: 2000000, nomorNota: '', statusNota: 'PENGELUARAN TANPA NOTA', driveFileId: '', driveUrl: '', namaFile: '', emailPenginput: 'bendahara', namaPenginput: 'Muhammad Rizki', tanggalDibuat: '2026-07-03T08:00:00', tanggalDiubah: '2026-07-03T08:00:00', terakhirDiubahOleh: 'Muhammad Rizki', status: 'ACTIVE' },
  { id: 'TRX-202607-000005', tanggal: '2026-07-04', kategori: 'Perlengkapan', uraian: 'Sapu, pel, dan alat kebersihan', volume: 1, hargaSatuan: 185000, total: 185000, nomorNota: 'NT-005', statusNota: 'ADA', driveFileId: 'file5', driveUrl: 'https://drive.google.com/file5', namaFile: 'TRX-202607-000005.jpg', emailPenginput: 'sekretaris', namaPenginput: 'Siti Aminah', tanggalDibuat: '2026-07-04T14:00:00', tanggalDiubah: '2026-07-04T14:00:00', terakhirDiubahOleh: 'Siti Aminah', status: 'ACTIVE' },
  { id: 'TRX-202607-000006', tanggal: '2026-07-05', kategori: 'Cetak & Fotokopi', uraian: 'Fotokopi surat undangan 200 lembar', volume: 200, hargaSatuan: 500, total: 100000, nomorNota: 'NT-006', statusNota: 'ADA', driveFileId: 'file6', driveUrl: 'https://drive.google.com/file6', namaFile: 'TRX-202607-000006.jpg', emailPenginput: 'sekretaris', namaPenginput: 'Siti Aminah', tanggalDibuat: '2026-07-05T09:00:00', tanggalDiubah: '2026-07-05T09:00:00', terakhirDiubahOleh: 'Siti Aminah', status: 'ACTIVE' },
  { id: 'TRX-202607-000007', tanggal: '2026-07-06', kategori: 'Konsumsi', uraian: 'Air mineral galon', volume: 10, hargaSatuan: 20000, total: 200000, nomorNota: 'NT-007', statusNota: 'ADA', driveFileId: 'file7', driveUrl: 'https://drive.google.com/file7', namaFile: 'TRX-202607-000007.jpg', emailPenginput: 'bendahara', namaPenginput: 'Muhammad Rizki', tanggalDibuat: '2026-07-06T08:00:00', tanggalDiubah: '2026-07-06T08:00:00', terakhirDiubahOleh: 'Muhammad Rizki', status: 'ACTIVE' },
  { id: 'TRX-202607-000008', tanggal: '2026-07-07', kategori: 'Listrik & Air', uraian: 'Tagihan listrik bulan Juli', volume: 1, hargaSatuan: 450000, total: 450000, nomorNota: 'NT-008', statusNota: 'ADA', driveFileId: 'file8', driveUrl: 'https://drive.google.com/file8', namaFile: 'TRX-202607-000008.jpg', emailPenginput: 'bendahara', namaPenginput: 'Muhammad Rizki', tanggalDibuat: '2026-07-07T10:00:00', tanggalDiubah: '2026-07-07T10:00:00', terakhirDiubahOleh: 'Muhammad Rizki', status: 'ACTIVE' },
  { id: 'TRX-202607-000009', tanggal: '2026-07-08', kategori: 'ATK', uraian: 'Tinta printer Canon 810 Black', volume: 2, hargaSatuan: 125000, total: 250000, nomorNota: 'NT-009', statusNota: 'ADA', driveFileId: 'file9', driveUrl: 'https://drive.google.com/file9', namaFile: 'TRX-202607-000009.jpg', emailPenginput: 'sekretaris', namaPenginput: 'Siti Aminah', tanggalDibuat: '2026-07-08T11:00:00', tanggalDiubah: '2026-07-08T11:00:00', terakhirDiubahOleh: 'Siti Aminah', status: 'ACTIVE' },
  { id: 'TRX-202607-000010', tanggal: '2026-07-09', kategori: 'Transport', uraian: 'Ojek online koordinasi donatur', volume: 2, hargaSatuan: 35000, total: 70000, nomorNota: '', statusNota: 'PENGELUARAN TANPA NOTA', driveFileId: '', driveUrl: '', namaFile: '', emailPenginput: 'ketua', namaPenginput: 'Ahmad Fauzi', tanggalDibuat: '2026-07-09T13:00:00', tanggalDiubah: '2026-07-09T13:00:00', terakhirDiubahOleh: 'Ahmad Fauzi', status: 'ACTIVE' },
  { id: 'TRX-202607-000011', tanggal: '2026-07-10', kategori: 'Konsumsi', uraian: 'Makan siang rapat koordinasi', volume: 15, hargaSatuan: 25000, total: 375000, nomorNota: 'NT-011', statusNota: 'ADA', driveFileId: 'file11', driveUrl: 'https://drive.google.com/file11', namaFile: 'TRX-202607-000011.jpg', emailPenginput: 'sekretaris', namaPenginput: 'Siti Aminah', tanggalDibuat: '2026-07-10T12:00:00', tanggalDiubah: '2026-07-10T12:00:00', terakhirDiubahOleh: 'Siti Aminah', status: 'ACTIVE' },
  { id: 'TRX-202607-000012', tanggal: '2026-07-11', kategori: 'Perlengkapan', uraian: 'Spanduk kegiatan bulan Juli', volume: 2, hargaSatuan: 150000, total: 300000, nomorNota: 'NT-012', statusNota: 'ADA', driveFileId: 'file12', driveUrl: 'https://drive.google.com/file12', namaFile: 'TRX-202607-000012.jpg', emailPenginput: 'sekretaris', namaPenginput: 'Siti Aminah', tanggalDibuat: '2026-07-11T09:00:00', tanggalDiubah: '2026-07-11T09:00:00', terakhirDiubahOleh: 'Siti Aminah', status: 'ACTIVE' },
  { id: 'TRX-202607-000013', tanggal: '2026-07-12', kategori: 'Lain-lain', uraian: 'Biaya tak terduga perbaikan pintu', volume: 1, hargaSatuan: 200000, total: 200000, nomorNota: '', statusNota: 'PENGELUARAN TANPA NOTA', driveFileId: '', driveUrl: '', namaFile: '', emailPenginput: 'bendahara', namaPenginput: 'Muhammad Rizki', tanggalDibuat: '2026-07-12T16:00:00', tanggalDiubah: '2026-07-12T16:00:00', terakhirDiubahOleh: 'Muhammad Rizki', status: 'ACTIVE' },
  { id: 'TRX-202607-000014', tanggal: '2026-07-13', kategori: 'Insentif & Bisyaroh', uraian: 'Insentif panitia kegiatan', volume: 8, hargaSatuan: 200000, total: 1600000, nomorNota: '', statusNota: 'PENGELUARAN TANPA NOTA', driveFileId: '', driveUrl: '', namaFile: '', emailPenginput: 'ketua', namaPenginput: 'Ahmad Fauzi', tanggalDibuat: '2026-07-13T08:00:00', tanggalDiubah: '2026-07-13T08:00:00', terakhirDiubahOleh: 'Ahmad Fauzi', status: 'ACTIVE' },
  { id: 'TRX-202607-000015', tanggal: '2026-07-14', kategori: 'ATK', uraian: 'Buku tulis dan pulpen', volume: 20, hargaSatuan: 12000, total: 240000, nomorNota: 'NT-015', statusNota: 'ADA', driveFileId: 'file15', driveUrl: 'https://drive.google.com/file15', namaFile: 'TRX-202607-000015.jpg', emailPenginput: 'sekretaris', namaPenginput: 'Siti Aminah', tanggalDibuat: '2026-07-14T08:00:00', tanggalDiubah: '2026-07-14T08:00:00', terakhirDiubahOleh: 'Siti Aminah', status: 'ACTIVE' },
]

// === AUDIT LOG ===
export const MOCK_AUDIT_LOG = [
  { id: 'AUD-001', tanggal: '2026-07-14T08:30:00', pengguna: 'Muhammad Rizki', aksi: 'LOGIN', sheet: '', idTransaksi: '', dataLama: '', dataBaru: '' },
  { id: 'AUD-002', tanggal: '2026-07-14T08:32:00', pengguna: 'Muhammad Rizki', aksi: 'CREATE', sheet: '2026-07', idTransaksi: 'TRX-202607-000015', dataLama: '', dataBaru: 'Buku tulis dan pulpen - Rp240.000' },
  { id: 'AUD-003', tanggal: '2026-07-13T15:00:00', pengguna: 'Ahmad Fauzi', aksi: 'CREATE', sheet: '2026-07', idTransaksi: 'TRX-202607-000014', dataLama: '', dataBaru: 'Insentif panitia kegiatan - Rp1.600.000' },
  { id: 'AUD-004', tanggal: '2026-07-13T10:00:00', pengguna: 'Siti Aminah', aksi: 'UPDATE', sheet: '2026-07', idTransaksi: 'TRX-202607-000011', dataLama: 'Volume: 10', dataBaru: 'Volume: 15' },
  { id: 'AUD-005', tanggal: '2026-07-12T16:00:00', pengguna: 'Muhammad Rizki', aksi: 'CREATE', sheet: '2026-07', idTransaksi: 'TRX-202607-000013', dataLama: '', dataBaru: 'Biaya tak terduga perbaikan pintu - Rp200.000' },
  { id: 'AUD-006', tanggal: '2026-07-12T09:00:00', pengguna: 'Siti Aminah', aksi: 'EXPORT', sheet: '2026-07', idTransaksi: '', dataLama: '', dataBaru: 'PDF - Juli 2026' },
]

// === SETTINGS ===
export const MOCK_SETTINGS = {
  namaOrganisasi: 'TAMJID',
  logo: '',
  folderDrive: 'Bukti Pengeluaran',
  tahunAktif: 2026,
  temaDefault: 'auto',
  ukuranMaksimalUpload: 10,
  formatNominal: 'IDR',
  formatTanggal: 'dd/MM/yyyy',
}
