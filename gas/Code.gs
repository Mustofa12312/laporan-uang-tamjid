/**
 * Google Apps Script - Backend REST API
 * Sistem Pelaporan Keuangan TAMJID
 * 
 * SETUP:
 * 1. Buka Google Spreadsheet
 * 2. Extensions > Apps Script
 * 3. Paste seluruh kode ini ke editor
 * 4. Deploy > New deployment > Web app
 * 5. Execute as: Me, Who has access: Anyone
 * 6. Copy URL dan masukkan ke .env VITE_GAS_API_URL
 */

// ============ CONFIG ============
const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE', // Ganti dengan ID Spreadsheet Anda
  ROOT_FOLDER_ID: 'YOUR_DRIVE_FOLDER_ID_HERE', // Folder "Bukti Pengeluaran"
  SALT: 'tamjid-salt-2026',
}

// ============ ROUTER ============
function doGet(e) {
  return handleRequest(e)
}

function doPost(e) {
  return handleRequest(e)
}

function handleRequest(e) {
  try {
    const params = e.parameter || {}
    const action = params.action || ''
    const postData = e.postData ? JSON.parse(e.postData.contents) : {}
    const data = { ...params, ...postData }

    let result
    switch (action) {
      // Auth
      case 'login': result = AuthService.login(data.username, data.password); break
      case 'changePassword': result = AuthService.changePassword(data.username, data.oldPassword, data.newPassword); break

      // Dashboard
      case 'dashboard': result = DashboardService.getDashboard(data.month || getCurrentMonth()); break

      // Transactions
      case 'getTransactions': result = TransactionService.list(data); break
      case 'getTransaction': result = TransactionService.get(data.id); break
      case 'createTransaction': result = TransactionService.create(data); break
      case 'updateTransaction': result = TransactionService.update(data.id, data); break
      case 'deleteTransaction': result = TransactionService.remove(data.id, data.username); break

      // Upload
      case 'upload': result = DriveService.upload(data); break

      // Categories
      case 'getCategories': result = CategoryService.list(); break
      case 'createCategory': result = CategoryService.create(data); break
      case 'updateCategory': result = CategoryService.update(data.id, data); break

      // Users
      case 'getUsers': result = UserService.list(); break

      // Settings
      case 'getSettings': result = SettingsService.get(); break

      // Audit
      case 'getAuditLog': result = AuditService.list(data); break

      // Health
      case 'health': result = { status: 'OK', timestamp: new Date().toISOString() }; break

      default: result = { error: 'Action not found: ' + action }
    }

    return jsonResponse(true, 'Berhasil', result)
  } catch (error) {
    return jsonResponse(false, error.message, null)
  }
}

function jsonResponse(success, message, data) {
  const output = JSON.stringify({ success, message, data, timestamp: new Date().toISOString() })
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON)
}

function getCurrentMonth() {
  return Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM')
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
}

// ============ AUTH SERVICE ============
const AuthService = {
  login(username, password) {
    if (!username || !password) throw new Error('Username dan password wajib diisi')
    const sheet = getSpreadsheet().getSheetByName('Users')
    const data = sheet.getDataRange().getValues()
    const headers = data[0]
    const usernameIdx = headers.indexOf('Username')
    const passwordIdx = headers.indexOf('Password Hash')
    const namaIdx = headers.indexOf('Nama')
    const jabatanIdx = headers.indexOf('Jabatan')
    const statusIdx = headers.indexOf('Status Aktif')
    const idIdx = headers.indexOf('ID')

    for (let i = 1; i < data.length; i++) {
      if (data[i][usernameIdx] === username && data[i][statusIdx] === true) {
        const storedHash = data[i][passwordIdx]
        if (hashPassword(password) === storedHash || storedHash === password) {
          // Update last login
          const loginIdx = headers.indexOf('Terakhir Login')
          if (loginIdx >= 0) sheet.getRange(i + 1, loginIdx + 1).setValue(new Date())

          AuditService.log('LOGIN', username, '', '', '')
          return {
            user: { id: data[i][idIdx], nama: data[i][namaIdx], username, jabatan: data[i][jabatanIdx] },
            token: Utilities.getUuid()
          }
        }
      }
    }
    throw new Error('Username atau password salah')
  },

  changePassword(username, oldPassword, newPassword) {
    if (!newPassword || newPassword.length < 4) throw new Error('Password baru minimal 4 karakter')
    const sheet = getSpreadsheet().getSheetByName('Users')
    const data = sheet.getDataRange().getValues()
    const headers = data[0]
    const usernameIdx = headers.indexOf('Username')
    const passwordIdx = headers.indexOf('Password Hash')

    for (let i = 1; i < data.length; i++) {
      if (data[i][usernameIdx] === username) {
        sheet.getRange(i + 1, passwordIdx + 1).setValue(hashPassword(newPassword))
        AuditService.log('CHANGE_PASSWORD', username, '', '', '')
        return { message: 'Password berhasil diubah' }
      }
    }
    throw new Error('Pengguna tidak ditemukan')
  }
}

function hashPassword(password) {
  const raw = password + CONFIG.SALT
  const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, raw)
  return hash.map(b => ('0' + (b & 0xFF).toString(16)).slice(-2)).join('')
}

// ============ TRANSACTION SERVICE ============
const TransactionService = {
  list(params) {
    const month = params.month || getCurrentMonth()
    const sheet = getOrCreateMonthSheet(month)
    const data = sheet.getDataRange().getValues()
    if (data.length <= 1) return { data: [], totalData: 0, totalHalaman: 0, halamanAktif: 1, totalNominal: 0 }

    const headers = data[0]
    let rows = data.slice(1).map(row => {
      const obj = {}
      headers.forEach((h, i) => {
        let val = row[i]
        // Konversi objek Date dari Spreadsheet menjadi string
        if (val instanceof Date) {
          if (h === 'Tanggal') val = Utilities.formatDate(val, 'Asia/Jakarta', 'yyyy-MM-dd')
          else val = Utilities.formatDate(val, 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss')
        }
        obj[columnKeyMap(h)] = val
      })
      return obj
    }).filter(r => r.status !== 'DELETED')

    // Search
    if (params.search) {
      const q = params.search.toLowerCase()
      rows = rows.filter(r =>
        (r.uraian || '').toLowerCase().includes(q) ||
        (r.kategori || '').toLowerCase().includes(q) ||
        (r.nomorNota || '').toLowerCase().includes(q) ||
        (r.namaPenginput || '').toLowerCase().includes(q)
      )
    }

    // Category filter
    if (params.category) rows = rows.filter(r => r.kategori === params.category)

    // Sort
    const sortField = params.sort || 'tanggal'
    const sortOrder = params.order || 'desc'
    rows.sort((a, b) => {
      const av = a[sortField], bv = b[sortField]
      return sortOrder === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })

    const totalNominal = rows.reduce((s, r) => s + (Number(r.total) || 0), 0)
    const pageSize = Number(params.pageSize) || 20
    const page = Number(params.page) || 1
    const totalData = rows.length
    const totalHalaman = Math.ceil(totalData / pageSize)
    const paged = rows.slice((page - 1) * pageSize, page * pageSize)

    return { data: paged, totalData, totalHalaman, halamanAktif: page, totalNominal }
  },

  get(id) {
    // Search across month sheets
    const ss = getSpreadsheet()
    const sheets = ss.getSheets().filter(s => /^\d{4}-\d{2}$/.test(s.getName()))
    for (const sheet of sheets) {
      const data = sheet.getDataRange().getValues()
      const headers = data[0]
      const idIdx = headers.indexOf('ID')
      for (let i = 1; i < data.length; i++) {
        if (data[i][idIdx] === id) {
          const obj = {}
          headers.forEach((h, idx) => obj[columnKeyMap(h)] = data[i][idx])
          return obj
        }
      }
    }
    throw new Error('Transaksi tidak ditemukan')
  },

  create(data) {
    const month = data.tanggal ? data.tanggal.substring(0, 7) : getCurrentMonth()
    const sheet = getOrCreateMonthSheet(month)
    const id = generateTransactionId(month, sheet)
    const now = new Date()

    const total = (Number(data.volume) || 0) * (Number(data.hargaSatuan) || 0)
    const row = [
      id, data.tanggal, data.kategori, data.uraian,
      Number(data.volume), Number(data.hargaSatuan), total,
      data.nomorNota || '', data.statusNota || 'ADA',
      data.driveFileId || '', data.driveUrl || '', data.namaFile || '',
      data.emailPenginput || '', data.namaPenginput || '',
      now, now, data.namaPenginput || '', 'ACTIVE'
    ]
    sheet.appendRow(row)

    AuditService.log('CREATE', data.namaPenginput || '', month, id, data.uraian + ' - Rp' + total)
    return { id, total }
  },

  update(id, data) {
    const ss = getSpreadsheet()
    const sheets = ss.getSheets().filter(s => /^\d{4}-\d{2}$/.test(s.getName()))
    for (const sheet of sheets) {
      const values = sheet.getDataRange().getValues()
      const headers = values[0]
      const idIdx = headers.indexOf('ID')
      for (let i = 1; i < values.length; i++) {
        if (values[i][idIdx] === id) {
          const oldData = JSON.stringify(values[i])
          // Update fields
          const fieldMap = { 'Tanggal': data.tanggal, 'Kategori': data.kategori, 'Uraian Barang': data.uraian, 'Volume': Number(data.volume), 'Harga Satuan': Number(data.hargaSatuan), 'Total': (Number(data.volume) || 0) * (Number(data.hargaSatuan) || 0), 'Nomor Nota': data.nomorNota, 'Status Nota': data.statusNota, 'Tanggal Diubah': new Date(), 'Terakhir Diubah Oleh': data.namaPenginput }
          Object.entries(fieldMap).forEach(([col, val]) => {
            const ci = headers.indexOf(col)
            if (ci >= 0 && val !== undefined) sheet.getRange(i + 1, ci + 1).setValue(val)
          })
          AuditService.log('UPDATE', data.namaPenginput || '', sheet.getName(), id, 'Updated')
          return { id }
        }
      }
    }
    throw new Error('Transaksi tidak ditemukan')
  },

  remove(id, username) {
    const ss = getSpreadsheet()
    const sheets = ss.getSheets().filter(s => /^\d{4}-\d{2}$/.test(s.getName()))
    for (const sheet of sheets) {
      const values = sheet.getDataRange().getValues()
      const headers = values[0]
      const idIdx = headers.indexOf('ID')
      const statusIdx = headers.indexOf('Status')
      for (let i = 1; i < values.length; i++) {
        if (values[i][idIdx] === id) {
          sheet.getRange(i + 1, statusIdx + 1).setValue('DELETED')
          AuditService.log('DELETE', username || '', sheet.getName(), id, values[i][headers.indexOf('Uraian Barang')])
          return { id }
        }
      }
    }
    throw new Error('Transaksi tidak ditemukan')
  }
}

// ============ DASHBOARD SERVICE ============
const DashboardService = {
  getDashboard(month) {
    const trxResult = TransactionService.list({ month, pageSize: 10000 })
    const trx = trxResult.data
    const total = trx.reduce((s, t) => s + (Number(t.total) || 0), 0)
    const today = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd')
    const totalHariIni = trx.filter(t => t.tanggal === today).reduce((s, t) => s + (Number(t.total) || 0), 0)

    const catMap = {}
    trx.forEach(t => { catMap[t.kategori] = (catMap[t.kategori] || 0) + (Number(t.total) || 0) })
    const categoryBreakdown = Object.entries(catMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

    const dailyMap = {}
    trx.forEach(t => { const d = t.tanggal ? t.tanggal.substring(8, 10) : '?'; dailyMap[d] = (dailyMap[d] || 0) + (Number(t.total) || 0) })
    const dailyTrend = Object.entries(dailyMap).map(([date, total]) => ({ date, total })).sort((a, b) => a.date.localeCompare(b.date))

    return {
      totalBulanIni: total, totalHariIni,
      jumlahTransaksi: trx.length,
      rataRataHarian: trx.length > 0 ? Math.round(total / 30) : 0,
      kategoriTerbesar: categoryBreakdown[0] || { name: '-', value: 0 },
      categoryBreakdown, dailyTrend,
      recentTransactions: trx.slice(-10).reverse(),
    }
  }
}

// ============ CATEGORY SERVICE ============
const CategoryService = {
  list() {
    const sheet = getSpreadsheet().getSheetByName('Categories')
    if (!sheet) return []
    const data = sheet.getDataRange().getValues()
    if (data.length <= 1) return []
    const headers = data[0]
    return data.slice(1).map(row => {
      const obj = {}
      headers.forEach((h, i) => {
        const key = h === 'ID' ? 'id' : h === 'Nama Kategori' ? 'nama' : h === 'Wajib Nota' ? 'wajibNota' : h === 'Status Aktif' ? 'statusAktif' : h === 'Urutan' ? 'urutan' : h
        obj[key] = row[i]
      })
      return obj
    }).filter(c => c.statusAktif !== false)
  },

  create(data) {
    const sheet = getSpreadsheet().getSheetByName('Categories')
    const id = 'CAT-' + String(sheet.getLastRow()).padStart(3, '0')
    sheet.appendRow([id, data.nama, data.wajibNota || false, true, sheet.getLastRow()])
    return { id }
  },

  update(id, data) {
    const sheet = getSpreadsheet().getSheetByName('Categories')
    const values = sheet.getDataRange().getValues()
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        if (data.nama) sheet.getRange(i + 1, 2).setValue(data.nama)
        if (data.wajibNota !== undefined) sheet.getRange(i + 1, 3).setValue(data.wajibNota)
        if (data.statusAktif !== undefined) sheet.getRange(i + 1, 4).setValue(data.statusAktif)
        return { id }
      }
    }
    throw new Error('Kategori tidak ditemukan')
  }
}

// ============ USER SERVICE ============
const UserService = {
  list() {
    const sheet = getSpreadsheet().getSheetByName('Users')
    const data = sheet.getDataRange().getValues()
    if (data.length <= 1) return []
    const headers = data[0]
    return data.slice(1).map(row => ({ id: row[0], nama: row[1], username: row[2], jabatan: row[4], statusAktif: row[5] }))
  }
}

// ============ SETTINGS SERVICE ============
const SettingsService = {
  get() {
    const sheet = getSpreadsheet().getSheetByName('Settings')
    if (!sheet) return {}
    const data = sheet.getDataRange().getValues()
    const settings = {}
    data.forEach(row => { if (row[0]) settings[row[0]] = row[1] })
    return settings
  }
}

// ============ DRIVE SERVICE ============
const DriveService = {
  upload(data) {
    if (!data.fileData || !data.fileName) throw new Error('File data required')
    const now = new Date()
    const year = now.getFullYear().toString()
    const month = ('0' + (now.getMonth() + 1)).slice(-2)

    // Get or create folder structure
    const rootFolder = DriveApp.getFolderById(CONFIG.ROOT_FOLDER_ID)
    let yearFolder = getOrCreateSubfolder(rootFolder, year)
    let monthFolder = getOrCreateSubfolder(yearFolder, month)

    const blob = Utilities.newBlob(Utilities.base64Decode(data.fileData), data.mimeType || 'image/jpeg', data.fileName)
    const file = monthFolder.createFile(blob)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)

    return { fileId: file.getId(), url: file.getUrl(), fileName: data.fileName }
  }
}

function getOrCreateSubfolder(parent, name) {
  const folders = parent.getFoldersByName(name)
  return folders.hasNext() ? folders.next() : parent.createFolder(name)
}

// ============ AUDIT SERVICE ============
const AuditService = {
  log(aksi, pengguna, sheet, idTransaksi, detail) {
    try {
      const auditSheet = getSpreadsheet().getSheetByName('AuditLog')
      if (!auditSheet) return
      const id = 'AUD-' + Date.now()
      auditSheet.appendRow([id, new Date(), pengguna, aksi, sheet, idTransaksi, '', detail, ''])
    } catch (e) { /* silent fail for audit */ }
  },

  list(params) {
    const sheet = getSpreadsheet().getSheetByName('AuditLog')
    if (!sheet) return { data: [], totalData: 0 }
    const data = sheet.getDataRange().getValues()
    if (data.length <= 1) return { data: [], totalData: 0 }
    const headers = data[0]
    const rows = data.slice(1).map(row => ({
      id: row[0], tanggal: row[1], pengguna: row[2], aksi: row[3],
      sheet: row[4], idTransaksi: row[5], dataLama: row[6], dataBaru: row[7]
    })).reverse()
    return { data: rows.slice(0, 100), totalData: rows.length }
  }
}

// ============ HELPERS ============
function getOrCreateMonthSheet(month) {
  const ss = getSpreadsheet()
  let sheet = ss.getSheetByName(month)
  if (sheet) return sheet

  const template = ss.getSheetByName('Template')
  if (template) {
    sheet = template.copyTo(ss)
    sheet.setName(month)
  } else {
    sheet = ss.insertSheet(month)
    sheet.appendRow(['ID','Tanggal','Kategori','Uraian Barang','Volume','Harga Satuan','Total','Nomor Nota','Status Nota','Google Drive File ID','Google Drive URL','Nama File','Email Penginput','Nama Penginput','Tanggal Dibuat','Tanggal Diubah','Terakhir Diubah Oleh','Status'])
  }
  return sheet
}

function generateTransactionId(month, sheet) {
  const monthCode = month.replace('-', '')
  const lastRow = sheet.getLastRow()
  const num = String(lastRow).padStart(6, '0')
  return 'TRX-' + monthCode + '-' + num
}

function columnKeyMap(header) {
  const map = {
    'ID': 'id', 'Tanggal': 'tanggal', 'Kategori': 'kategori', 'Uraian Barang': 'uraian',
    'Volume': 'volume', 'Harga Satuan': 'hargaSatuan', 'Total': 'total',
    'Nomor Nota': 'nomorNota', 'Status Nota': 'statusNota',
    'Google Drive File ID': 'driveFileId', 'Google Drive URL': 'driveUrl', 'Nama File': 'namaFile',
    'Email Penginput': 'emailPenginput', 'Nama Penginput': 'namaPenginput',
    'Tanggal Dibuat': 'tanggalDibuat', 'Tanggal Diubah': 'tanggalDiubah',
    'Terakhir Diubah Oleh': 'terakhirDiubahOleh', 'Status': 'status'
  }
  return map[header] || header
}

// ============ INITIAL SETUP ============
/**
 * Run this function ONCE to set up the spreadsheet structure
 */
function setupSpreadsheet() {
  const ss = getSpreadsheet()

  // Users sheet
  let sheet = ss.getSheetByName('Users') || ss.insertSheet('Users')
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ID', 'Nama', 'Username', 'Password Hash', 'Jabatan', 'Status Aktif', 'Tanggal Dibuat', 'Terakhir Login'])
    sheet.appendRow(['USR-001', 'Ketua TAMJID', 'ketua', hashPassword('ketua123'), 'Ketua', true, new Date(), ''])
    sheet.appendRow(['USR-002', 'Sekretaris TAMJID', 'sekretaris', hashPassword('sekretaris123'), 'Sekretaris', true, new Date(), ''])
    sheet.appendRow(['USR-003', 'Bendahara TAMJID', 'bendahara', hashPassword('bendahara123'), 'Bendahara', true, new Date(), ''])
  }

  // Categories sheet
  sheet = ss.getSheetByName('Categories') || ss.insertSheet('Categories')
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ID', 'Nama Kategori', 'Wajib Nota', 'Status Aktif', 'Urutan'])
    sheet.appendRow(['CAT-001', 'ATK', true, true, 1])
    sheet.appendRow(['CAT-002', 'Konsumsi', true, true, 2])
    sheet.appendRow(['CAT-003', 'Transport', false, true, 3])
    sheet.appendRow(['CAT-004', 'Insentif & Bisyaroh', false, true, 4])
    sheet.appendRow(['CAT-005', 'Perlengkapan', true, true, 5])
    sheet.appendRow(['CAT-006', 'Cetak & Fotokopi', true, true, 6])
    sheet.appendRow(['CAT-007', 'Lain-lain', false, true, 7])
    sheet.appendRow(['CAT-008', 'Listrik & Air', true, true, 8])
  }

  // Settings sheet
  sheet = ss.getSheetByName('Settings') || ss.insertSheet('Settings')
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Key', 'Value'])
    sheet.appendRow(['Nama Organisasi', 'TAMJID'])
    sheet.appendRow(['Tahun Aktif', 2026])
    sheet.appendRow(['Tema Default', 'auto'])
    sheet.appendRow(['Ukuran Maksimal Upload', 10])
  }

  // AuditLog sheet
  sheet = ss.getSheetByName('AuditLog') || ss.insertSheet('AuditLog')
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ID', 'Tanggal', 'Pengguna', 'Aksi', 'Sheet', 'ID Transaksi', 'Data Lama', 'Data Baru', 'IP'])
  }

  // Template sheet
  sheet = ss.getSheetByName('Template') || ss.insertSheet('Template')
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['ID','Tanggal','Kategori','Uraian Barang','Volume','Harga Satuan','Total','Nomor Nota','Status Nota','Google Drive File ID','Google Drive URL','Nama File','Email Penginput','Nama Penginput','Tanggal Dibuat','Tanggal Diubah','Terakhir Diubah Oleh','Status'])
  }

  Logger.log('Setup complete!')
}
