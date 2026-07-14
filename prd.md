# Product Requirements Document (PRD)

# Sistem Pelaporan Keuangan Bulanan Berbasis Web

### Versi 1.0

---

# Revision History

| Versi | Tanggal   | Penulis | Keterangan       |
| ----- | --------- | ------- | ---------------- |
| 1.0   | Juli 2026 | Mustofa | Dokumen awal PRD |

---

# Daftar Isi

1. Pendahuluan
2. Latar Belakang
3. Tujuan Sistem
4. Visi Produk
5. Ruang Lingkup
6. Stakeholder
7. Peran Pengguna
8. Target Platform
9. Arsitektur Sistem
10. Teknologi yang Digunakan
11. Prinsip Desain
12. Sasaran Performa
13. Gambaran Alur Sistem

---

# 1. Pendahuluan

Sistem Pelaporan Keuangan Bulanan merupakan aplikasi web modern yang digunakan untuk mencatat, mengelola, menganalisis, dan membuat laporan seluruh pengeluaran organisasi secara digital.

Aplikasi dirancang untuk menggantikan proses pencatatan manual maupun penggunaan Google Form secara langsung, sehingga seluruh aktivitas dilakukan melalui antarmuka web yang modern, cepat, responsif, dan mudah digunakan baik dari perangkat Android maupun laptop.

Seluruh data transaksi disimpan pada Google Spreadsheet sebagai database, sedangkan seluruh bukti transaksi (nota, kuitansi, foto belanja) disimpan pada Google Drive. Google Apps Script berfungsi sebagai REST API yang menghubungkan aplikasi dengan layanan Google.

Sistem mengutamakan kemudahan penggunaan, keamanan data, transparansi laporan, dan kemampuan menghasilkan laporan bulanan secara profesional.

---

# 2. Latar Belakang

Proses pencatatan keuangan sering menghadapi beberapa kendala:

- Data tersebar di berbagai file.
- Sulit mencari transaksi lama.
- Rekap bulanan dilakukan secara manual.
- Bukti transaksi tidak tersusun rapi.
- Pembuatan laporan memerlukan waktu lama.
- Sulit mengetahui total pengeluaran secara real-time.
- Tidak tersedia dashboard analitik.
- Tidak ada riwayat perubahan data.

Aplikasi ini dibangun untuk menyelesaikan seluruh permasalahan tersebut melalui satu sistem yang terintegrasi.

---

# 3. Tujuan Sistem

Tujuan utama sistem adalah:

- Mempermudah pencatatan seluruh transaksi pengeluaran.
- Menyimpan bukti transaksi secara digital.
- Menghasilkan laporan bulanan secara otomatis.
- Menyediakan dashboard analitik keuangan.
- Mempermudah proses audit.
- Mengurangi kesalahan pencatatan.
- Menyediakan akses data secara real-time.
- Menampilkan laporan yang siap dicetak kapan saja.

---

# 4. Visi Produk

Menjadi sistem pelaporan keuangan berbasis web yang modern, cepat, mudah digunakan, transparan, dan mampu menghasilkan laporan profesional dengan memanfaatkan ekosistem Google Workspace sebagai penyimpanan data.

---

# 5. Ruang Lingkup

## Termasuk

- Login pengguna
- Dashboard
- Input transaksi
- Edit transaksi
- Hapus transaksi
- Upload bukti belanja
- Penyimpanan Google Drive
- Database Google Spreadsheet
- Rekap bulanan
- Rekap tahunan
- Grafik analitik
- Export PDF
- Export Excel
- Export CSV
- Print A4
- Dark Mode
- Responsive Mobile
- Responsive Desktop
- Audit Log
- Pengaturan kategori
- Pengaturan pengguna

## Tidak Termasuk

- Sistem akuntansi double entry.
- Integrasi perbankan.
- Pembayaran online.
- Multi organisasi.
- Multi cabang.
- Sistem perpajakan.
- Integrasi ERP.

---

# 6. Stakeholder

## Ketua

Tanggung jawab:

- Melihat seluruh laporan.
- Mengelola transaksi.
- Mengedit transaksi.
- Menghapus transaksi.
- Mengekspor laporan.
- Melihat dashboard.
- Mengelola kategori.
- Mengelola pengguna.
- Mengunci laporan bulanan (opsional pada versi berikutnya).

---

## Sekretaris

Tanggung jawab:

- Input transaksi.
- Mengedit transaksi.
- Menghapus transaksi.
- Upload bukti transaksi.
- Melihat dashboard.
- Export laporan.

---

## Bendahara

Tanggung jawab:

- Input transaksi.
- Mengedit transaksi.
- Menghapus transaksi.
- Upload bukti transaksi.
- Melihat dashboard.
- Export laporan.

---

# 7. Peran Pengguna

Pada versi pertama seluruh pengguna memiliki hak akses yang sama.

| Fitur               | Ketua | Sekretaris | Bendahara |
| ------------------- | :---: | :--------: | :-------: |
| Login               |  ✅   |     ✅     |    ✅     |
| Dashboard           |  ✅   |     ✅     |    ✅     |
| Input               |  ✅   |     ✅     |    ✅     |
| Edit                |  ✅   |     ✅     |    ✅     |
| Hapus               |  ✅   |     ✅     |    ✅     |
| Upload Bukti        |  ✅   |     ✅     |    ✅     |
| Export PDF          |  ✅   |     ✅     |    ✅     |
| Export Excel        |  ✅   |     ✅     |    ✅     |
| Export CSV          |  ✅   |     ✅     |    ✅     |
| Print               |  ✅   |     ✅     |    ✅     |
| Grafik              |  ✅   |     ✅     |    ✅     |
| Pengaturan Kategori |  ✅   |     ✅     |    ✅     |
| Pengaturan Password |  ✅   |     ✅     |    ✅     |

Walaupun hak akses sama, sistem tetap menyimpan informasi **siapa yang membuat** dan **siapa yang terakhir mengubah** setiap transaksi.

---

# 8. Target Platform

## Desktop

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

Resolusi minimum:

- 1366 × 768

Resolusi optimal:

- 1920 × 1080 ke atas

---

## Mobile Android

Minimal Android 9.

Browser:

- Chrome
- Edge
- Firefox

Seluruh fungsi aplikasi harus dapat digunakan tanpa perbedaan fitur dibandingkan versi desktop.

---

# 9. Arsitektur Sistem

```
React + Vite
        │
        │ Axios
        ▼
Google Apps Script (REST API)
        │
        ├──────── Google Spreadsheet
        │          │
        │          ├── Pengguna
        │          ├── Kategori
        │          ├── Template
        │          ├── 2026-01
        │          ├── 2026-02
        │          ├── 2026-03
        │          └── dst.
        │
        └──────── Google Drive
                   │
                   ├── Folder Bukti
                   ├── 2026
                   │     ├── 01
                   │     ├── 02
                   │     └── dst.
                   └── File Nota
```

---

# 10. Teknologi yang Digunakan

## Frontend

- React 19+
- Vite
- Tailwind CSS
- Axios
- React Router
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Recharts
- Framer Motion
- React Hot Toast
- Lucide React

---

## Backend

Google Apps Script

Berfungsi sebagai:

- REST API
- Validasi Data
- Upload Google Drive
- Membaca Spreadsheet
- Membuat Sheet Bulanan
- Export Data

---

## Database

Google Spreadsheet

Model database:

**1 Bulan = 1 Sheet**

Contoh:

```
2026-01
2026-02
2026-03
```

Sheet permanen:

- Users
- Categories
- Template
- Settings
- AuditLog

---

## Penyimpanan File

Google Drive

Struktur:

```
Bukti Belanja

├── 2026
│    ├── 01
│    ├── 02
│    ├── 03
│    └── dst.
└── 2027
```

---

# 11. Prinsip Desain

Aplikasi harus mengikuti prinsip berikut:

### Modern

Menggunakan desain dashboard setara aplikasi SaaS modern.

### Mobile First

Seluruh fitur dirancang terlebih dahulu untuk perangkat Android sebelum dioptimalkan untuk desktop.

### Clean Interface

Antarmuka sederhana, fokus pada informasi penting, tanpa elemen yang mengganggu.

### Cepat

Navigasi dan pemuatan data harus terasa instan dengan memanfaatkan caching dan pemanggilan API yang efisien.

### Konsisten

Seluruh komponen memiliki pola desain, warna, ikon, dan interaksi yang seragam.

### Mudah Dipelajari

Pengguna baru diharapkan dapat memahami penggunaan aplikasi dalam waktu singkat tanpa pelatihan khusus.

---

# 12. Sasaran Performa

| Parameter        | Target     |
| ---------------- | ---------- |
| Login            | < 2 detik  |
| Dashboard        | < 2 detik  |
| Pencarian        | < 500 ms   |
| Filter           | < 500 ms   |
| Simpan transaksi | < 3 detik  |
| Upload bukti     | < 5 detik  |
| Export PDF       | < 10 detik |
| Export Excel     | < 5 detik  |
| Export CSV       | < 3 detik  |
| Print Preview    | < 3 detik  |

---

# 13. Gambaran Alur Sistem

```
Login

↓

Dashboard

↓

Input Transaksi

↓

Validasi Data

↓

Upload Bukti ke Google Drive

↓

Simpan Data ke Sheet Bulanan

↓

Dashboard Diperbarui

↓

Laporan Bulanan

↓

Export PDF / Excel / CSV

↓

Print A4
```

---

# Penutup Bagian 1

Dokumen ini menjadi dasar pengembangan aplikasi pelaporan keuangan berbasis web yang modern, responsif, dan mudah digunakan. Arsitektur yang dipilih memanfaatkan React + Vite sebagai frontend, Google Apps Script sebagai REST API, Google Spreadsheet sebagai basis data, dan Google Drive sebagai penyimpanan bukti transaksi. Seluruh keputusan desain difokuskan pada kemudahan penggunaan, performa tinggi, transparansi data, serta kemudahan pengembangan di masa mendatang.

# Product Requirements Document (PRD)

# Bagian 2 — Functional Requirements

---

# 2.1 Modul Autentikasi (Login)

## Tujuan

Memastikan hanya pengguna yang terdaftar yang dapat mengakses aplikasi.

---

## Aktor

- Ketua
- Sekretaris
- Bendahara

---

## Fitur

- Login menggunakan Username dan Password.
- Password disimpan dalam bentuk hash.
- Logout.
- Ganti Password.
- Remember Login (opsional).
- Session timeout.

---

## Alur

```
Buka Website

↓

Masukkan Username

↓

Masukkan Password

↓

Validasi

↓

Dashboard
```

---

## Validasi

- Username wajib diisi.
- Password wajib diisi.
- Username harus terdaftar.
- Password harus sesuai.

---

## Acceptance Criteria

✅ Login berhasil menuju Dashboard.

✅ Login gagal menampilkan pesan kesalahan.

---

# 2.2 Dashboard

## Tujuan

Memberikan gambaran kondisi keuangan secara cepat.

---

## Informasi yang Ditampilkan

### Ringkasan

- Total Pengeluaran Bulan Ini
- Jumlah Transaksi
- Pengeluaran Hari Ini
- Pengeluaran Minggu Ini
- Pengeluaran Bulan Lalu
- Selisih Bulan Lalu
- Kategori Terbesar
- Pengguna Teraktif

---

### Grafik

- Bar Chart
- Pie Chart
- Line Chart
- Area Chart

---

### Widget

- 10 transaksi terakhir
- Bukti terakhir diupload
- Pengeluaran terbesar
- Pengeluaran hari ini

---

## Filter

- Bulan
- Tahun

Semua widget berubah otomatis mengikuti filter.

---

# 2.3 Modul Input Transaksi

## Tujuan

Mencatat seluruh pengeluaran organisasi.

---

## Field

| Field        | Wajib     |
| ------------ | --------- |
| Tanggal      | ✅        |
| Kategori     | ✅        |
| Uraian       | ✅        |
| Volume       | ✅        |
| Harga Satuan | ✅        |
| Nomor Nota   | Opsional  |
| Upload Bukti | Bersyarat |

---

## Perhitungan

```
Total =

Volume × Harga Satuan
```

Total dihitung otomatis.

---

## Format Nominal

Input

```
50000
```

Tampilan

```
Rp50.000
```

Database tetap menyimpan angka murni.

---

## Upload Bukti

User memilih gambar.

↓

Preview muncul.

↓

Compress otomatis.

↓

Upload ke Google Drive.

↓

Link disimpan di Spreadsheet.

---

## Format yang Didukung

- JPG
- JPEG
- PNG
- WEBP

---

## Maksimal Ukuran

10 MB sebelum kompresi.

---

## Kompresi

Target ukuran

< 500 KB.

---

# 2.4 Business Rules

Kategori berikut:

- Transport
- Insentif & Bisyaroh
- Lain-lain

Tidak wajib mengisi

- Nomor Nota
- Upload Bukti

Sistem otomatis menambahkan keterangan

```
PENGELUARAN TANPA NOTA
```

Kategori lainnya wajib memiliki bukti transaksi.

---

# 2.5 Edit Transaksi

Semua pengguna dapat

- Mengubah data
- Mengubah kategori
- Mengubah nominal
- Mengubah bukti
- Mengubah tanggal

---

Setelah disimpan

Dashboard otomatis diperbarui.

---

# 2.6 Hapus Transaksi

Saat tombol hapus ditekan

↓

Dialog konfirmasi muncul.

```
Apakah Anda yakin?

Ya

Tidak
```

Jika Ya

↓

Data dihapus.

↓

Audit Log dibuat.

---

# 2.7 Pencarian

Search Global.

Contoh

```
Laptop
```

↓

Menampilkan seluruh transaksi terkait.

Search bekerja pada

- Uraian
- Nomor Nota
- Penginput
- Kategori

---

# 2.8 Filter

Filter berdasarkan

- Bulan
- Tahun
- Rentang Tanggal
- Kategori
- Penginput
- Nominal Minimum
- Nominal Maksimum
- Ada Bukti
- Tanpa Bukti

Filter dapat digabungkan.

---

# 2.9 Tabel Transaksi

Kolom

- Nomor
- Tanggal
- Kategori
- Uraian
- Volume
- Harga
- Total
- Nomor Nota
- Bukti
- Penginput
- Aksi

---

Fitur

- Sticky Header
- Sticky Nomor
- Sorting
- Pagination
- Search
- Resize Column
- Responsive
- Hide Column
- Export sesuai filter

---

# 2.10 Detail Transaksi

Klik satu transaksi.

Panel kanan muncul.

Menampilkan

- Foto Nota
- Semua informasi transaksi
- Tanggal dibuat
- Dibuat oleh
- Terakhir diubah
- Tombol Edit
- Tombol Print

---

# 2.11 Dashboard Bulanan

Setiap bulan menggunakan

```
1 Sheet Google Spreadsheet
```

Contoh

```
2026-07
```

Saat bulan baru

↓

Jika sheet belum ada

↓

Google Apps Script membuat sheet baru berdasarkan Template.

---

# 2.12 Dashboard Tahunan

Menggabungkan seluruh sheet.

Contoh

```
2026-01

2026-02

2026-03
```

↓

Menampilkan

- Total Tahunan
- Grafik
- Rekap Bulanan
- Perbandingan Bulan

---

# 2.13 Upload Bukti

Folder Google Drive

```
Bukti Belanja

└── 2026

      ├──01

      ├──02

      ├──03
```

Nama file otomatis.

Contoh

```
20260714_082314.jpg
```

---

# 2.14 Riwayat Perubahan (Audit Log)

Setiap perubahan dicatat.

Data yang disimpan

- Waktu
- Username
- Aksi
- Data Lama
- Data Baru
- IP (opsional)

Audit Log tidak dapat diubah melalui aplikasi.

---

# 2.15 Manajemen Kategori

Fitur

- Tambah
- Edit
- Hapus
- Aktif / Nonaktif

Kategori baru langsung tersedia pada form transaksi tanpa perlu mengubah kode aplikasi.

---

# 2.16 Pengaturan Sistem

Pengguna dapat mengubah

- Nama Organisasi
- Logo
- Password Pengguna
- Daftar Kategori
- Folder Google Drive
- Tahun Aktif
- Tema (Light/Dark/Auto)

---

# 2.17 Notifikasi

Menggunakan Toast Notification.

Contoh

```
✔ Data berhasil disimpan
```

```
✔ Upload berhasil
```

```
⚠ Upload gagal
```

```
❌ Gagal terhubung ke server
```

---

# 2.18 Error Handling

Jika Spreadsheet tidak dapat diakses

↓

Muncul halaman error.

Jika Google Drive gagal upload

↓

Upload dibatalkan.

↓

Data transaksi tidak disimpan.

Jika internet terputus

↓

Muncul pemberitahuan.

↓

Pengguna dapat mencoba kembali.

---

# 2.19 Acceptance Criteria

Sistem dinyatakan memenuhi kebutuhan apabila:

- Seluruh transaksi dapat disimpan ke sheet bulan yang aktif.
- Bukti transaksi berhasil diunggah ke Google Drive.
- Dashboard diperbarui secara otomatis setelah transaksi berubah.
- Laporan dapat diekspor ke PDF, Excel, CSV, dan Print A4.
- Aplikasi dapat digunakan dengan baik pada Android dan Desktop.
- Seluruh perubahan tercatat pada Audit Log.
- Waktu respon tetap sesuai target performa yang telah ditetapkan pada Bagian 1.

# Product Requirements Document (PRD)

# Bagian 3 — UI/UX Specification

---

# 3.1 Filosofi Desain

Aplikasi harus memberikan kesan **profesional, modern, ringan, dan terpercaya**, setara dengan aplikasi SaaS kelas dunia seperti:

- Stripe Dashboard
- Notion
- Linear
- Vercel
- GitHub
- Google Analytics

Pengguna utama bukanlah orang yang memiliki latar belakang teknis, sehingga seluruh antarmuka harus mudah dipahami tanpa pelatihan khusus.

Target utama desain:

- Cepat dipelajari.
- Nyaman digunakan berjam-jam.
- Fokus pada data.
- Tidak banyak klik.
- Konsisten.
- Responsif di Android maupun Laptop.

---

# 3.2 Design Principles

### Simple

Setiap halaman hanya menampilkan informasi yang benar-benar dibutuhkan.

---

### Fast

Semua aksi terasa instan.

- Skeleton Loading
- Lazy Loading
- Smooth Animation

---

### Consistent

Seluruh tombol, icon, warna, tabel, card dan dialog menggunakan pola yang sama.

---

### Mobile First

Seluruh halaman dirancang terlebih dahulu untuk Android.

Kemudian dikembangkan menjadi versi Desktop.

---

### Accessibility

- Font mudah dibaca.
- Kontras tinggi.
- Tombol besar.
- Mudah disentuh menggunakan jari.

---

# 3.3 Design System

## Border Radius

| Komponen      | Radius |
| ------------- | ------ |
| Button        | 14 px  |
| Input         | 14 px  |
| Card          | 20 px  |
| Modal         | 24 px  |
| Image Preview | 20 px  |

---

## Shadow

Menggunakan shadow lembut.

Tidak menggunakan shadow yang terlalu gelap.

---

## Spacing

Menggunakan sistem 8 px.

Contoh

8

16

24

32

40

48

64

---

# 3.4 Color Palette

## Primary

Blue

```text
#2563EB
```

---

## Success

Green

```text
#22C55E
```

---

## Warning

Orange

```text
#F59E0B
```

---

## Danger

Red

```text
#EF4444
```

---

## Background

Light

```text
#F8FAFC
```

Dark

```text
#0F172A
```

---

## Card

Light

White

Dark

```text
#1E293B
```

---

# 3.5 Typography

Font

Inter

Fallback

- Roboto
- Segoe UI
- Sans-serif

---

Ukuran

| Komponen        | Ukuran |
| --------------- | ------ |
| Judul Dashboard | 32 px  |
| Heading         | 24 px  |
| Sub Heading     | 20 px  |
| Body            | 16 px  |
| Table           | 14 px  |
| Caption         | 12 px  |

---

# 3.6 Icon

Menggunakan

Lucide React

Semua icon memiliki ukuran yang konsisten.

24 px

20 px

16 px

---

# 3.7 Layout Desktop

```
+---------------------------------------------------------------+

 Sidebar      Header

 Dashboard    Search              Profil

 Transaksi

 Laporan

 Export

 Setting

---------------------------------------------------------------

 Card Card Card Card

---------------------------------------------------------------

 Grafik Bar

---------------------------------------------------------------

 Pie Chart             Line Chart

---------------------------------------------------------------

 Tabel Transaksi

---------------------------------------------------------------
```

Sidebar dapat di-collapse.

---

# 3.8 Layout Android

```
Dashboard

Card

Card

Card

Grafik

Transaksi Terakhir

------------------------

Bottom Navigation

Dashboard

Transaksi

+

Laporan

Setting
```

Floating Action Button digunakan untuk menambah transaksi.

---

# 3.9 Login Page

Komponen

- Logo
- Nama Organisasi
- Username
- Password
- Tombol Login

Background menggunakan ilustrasi sederhana dengan gradasi modern.

---

# 3.10 Dashboard

Halaman pertama setelah login.

Menampilkan

### Ringkasan

- Total Pengeluaran
- Jumlah Transaksi
- Pengeluaran Hari Ini
- Pengeluaran Bulan Ini
- Pengguna Teraktif
- Kategori Terbesar

---

### Grafik

- Bar Chart
- Pie Chart
- Line Chart
- Area Chart

---

### Widget

- Aktivitas Terbaru
- Transaksi Terakhir
- Bukti Terakhir
- Statistik

---

# 3.11 Halaman Input Transaksi

Urutan field

1. Tanggal
2. Kategori
3. Uraian
4. Volume
5. Harga
6. Total (otomatis)
7. Nomor Nota
8. Upload Bukti

Preview gambar langsung muncul setelah dipilih.

---

Jika kategori

- Transport
- Insentif & Bisyaroh
- Lain-lain

maka

Nomor Nota

Upload Bukti

otomatis menjadi opsional.

Sistem menampilkan badge

"PENGELUARAN TANPA NOTA"

---

# 3.12 Komponen Upload

Drag & Drop (Desktop)

Klik Upload (Android)

Setelah memilih gambar

↓

Preview

↓

Compress

↓

Progress Bar

↓

Upload

↓

Selesai

---

# 3.13 Tabel Transaksi

Fitur

- Sticky Header
- Sticky Kolom Nomor
- Search
- Sorting
- Pagination
- Responsive
- Export
- Filter

Hover baris menampilkan warna lembut.

---

# 3.14 Detail Transaksi

Klik transaksi.

Drawer muncul dari kanan.

Menampilkan

- Preview Nota
- Informasi lengkap
- Riwayat perubahan
- Tombol Edit
- Tombol Print

Desktop menggunakan Drawer.

Android menggunakan Bottom Sheet Fullscreen.

---

# 3.15 Dashboard Analytics

Menampilkan

## Grafik Batang

Perbandingan kategori.

---

## Pie Chart

Persentase kategori.

---

## Line Chart

Perkembangan pengeluaran bulanan.

---

## Area Chart

Tren harian.

---

Klik grafik

↓

Dashboard otomatis terfilter.

---

# 3.16 Rekap Bulanan

Memilih

Juli 2026

↓

Menampilkan

- Total
- Grafik
- Semua transaksi
- Export

---

# 3.17 Rekap Tahunan

Memilih

2026

↓

Menampilkan

- Total Tahunan
- Grafik 12 Bulan
- Perbandingan Bulan
- Persentase Kenaikan

---

# 3.18 Export

Tersedia

- PDF
- Excel
- CSV
- Print

Preview sebelum download.

Export mengikuti filter yang sedang aktif.

---

# 3.19 Print A4

Format resmi.

Header

Logo Organisasi

Nama Organisasi

Judul Laporan

Periode

Isi

Tabel transaksi

Footer

Tanggal cetak

Nomor halaman

Kolom tanda tangan

Ketua

Sekretaris

Bendahara

---

# 3.20 Dark Mode

Mode

- Light
- Dark
- Auto

Disimpan pada browser.

---

# 3.21 Loading

Semua halaman menggunakan

Skeleton Loading.

Tidak menggunakan spinner penuh kecuali proses upload.

---

# 3.22 Empty State

Jika belum ada data.

Muncul ilustrasi.

"Tidak ada transaksi pada bulan ini."

Disertai tombol

Tambah Transaksi.

---

# 3.23 Error State

Jika internet terputus.

Muncul halaman sederhana.

"Gagal mengambil data."

Tombol

Coba Lagi

---

# 3.24 Success Feedback

Menggunakan Toast.

Contoh

✔ Transaksi berhasil disimpan.

✔ Upload berhasil.

✔ PDF berhasil dibuat.

---

# 3.25 Animasi

Menggunakan Framer Motion.

Animasi

- Fade
- Slide
- Scale
- Card Hover

Durasi

200–300 ms

Tidak menggunakan animasi berlebihan.

---

# 3.26 Responsive Breakpoint

| Perangkat | Lebar        |
| --------- | ------------ |
| Mobile    | <640 px      |
| Tablet    | 640–1023 px  |
| Laptop    | 1024–1439 px |
| Desktop   | ≥1440 px     |

Semua fitur harus tersedia pada seluruh ukuran layar tanpa kehilangan fungsi.

---

# 3.27 Konsistensi Komponen

Semua komponen berasal dari satu Design System.

Meliputi:

- Button
- Input
- Select
- Date Picker
- Modal
- Drawer
- Table
- Badge
- Toast
- Card
- Tooltip
- Avatar
- Pagination
- Progress Bar
- Loading Skeleton

Tidak diperbolehkan membuat komponen dengan gaya yang berbeda-beda agar aplikasi tetap memiliki identitas visual yang konsisten.

---

# 3.28 Pengalaman Pengguna (UX Goals)

Aplikasi harus mampu memberikan pengalaman sebagai berikut:

- Pengguna dapat membuat transaksi baru dalam waktu kurang dari **30 detik**.
- Dashboard mudah dipahami dalam waktu kurang dari **10 detik** setelah dibuka.
- Seluruh fitur utama dapat dijangkau dengan maksimal **3 kali klik**.
- Proses upload bukti memiliki indikator yang jelas.
- Pengguna selalu mengetahui status setiap proses (loading, berhasil, gagal).
- Antarmuka tetap nyaman digunakan pada layar HP maupun monitor besar.

---

# Penutup Bagian 3

UI/UX aplikasi dirancang dengan pendekatan **mobile-first** dan mengadopsi pola desain SaaS modern agar memberikan pengalaman yang cepat, intuitif, dan profesional. Fokus utama adalah menyederhanakan proses pencatatan keuangan tanpa mengurangi kelengkapan informasi, sehingga Ketua, Sekretaris, maupun Bendahara dapat bekerja secara efisien baik melalui perangkat Android maupun laptop.

# Product Requirements Document (PRD)

# Bagian 4 — Data Architecture, Google Spreadsheet & Google Drive

---

# 4.1 Tujuan

Bagian ini menjelaskan struktur penyimpanan data yang digunakan oleh sistem.

Aplikasi menggunakan:

- **Google Spreadsheet** sebagai database utama.
- **Google Drive** sebagai penyimpanan seluruh bukti transaksi.
- **Google Apps Script** sebagai REST API yang menghubungkan aplikasi dengan layanan Google.

Tujuan utama arsitektur ini adalah:

- Mudah dikelola.
- Tidak memerlukan server database.
- Biaya operasional rendah.
- Mudah di-backup.
- Mudah dipindahkan ke database SQL di masa depan.

---

# 4.2 Arsitektur Data

```text
React + Vite
        │
        │ REST API (Axios)
        ▼
Google Apps Script
        │
        ├──────── Google Spreadsheet
        │
        └──────── Google Drive
```

Seluruh komunikasi hanya melalui Google Apps Script.

Frontend **tidak pernah** mengakses Spreadsheet maupun Google Drive secara langsung.

---

# 4.3 Struktur Google Spreadsheet

## Sheet Permanen

Sheet berikut selalu ada.

| Nama Sheet     | Fungsi                               |
| -------------- | ------------------------------------ |
| Settings       | Konfigurasi aplikasi                 |
| Users          | Data pengguna                        |
| Categories     | Daftar kategori                      |
| Template       | Template sheet bulanan               |
| AuditLog       | Riwayat perubahan                    |
| DashboardCache | Cache statistik dashboard (opsional) |

---

## Sheet Bulanan

Setiap bulan memiliki satu sheet.

Contoh

```text
2026-01
2026-02
2026-03
2026-04
...
2027-01
```

Nama menggunakan format

```text
YYYY-MM
```

agar mudah diproses sistem.

---

# 4.4 Pembuatan Sheet Otomatis

Saat pengguna membuka aplikasi.

↓

Google Apps Script membaca tanggal server.

↓

Jika sheet bulan berjalan belum tersedia.

↓

Sistem menyalin sheet

```text
Template
```

↓

Mengubah nama menjadi

```text
2026-07
```

↓

Aplikasi langsung menggunakan sheet tersebut.

Pengguna tidak perlu membuat sheet secara manual.

---

# 4.5 Struktur Kolom Sheet Bulanan

| Kolom | Nama                 |
| ----- | -------------------- |
| A     | ID                   |
| B     | Tanggal              |
| C     | Kategori             |
| D     | Uraian Barang        |
| E     | Volume               |
| F     | Harga Satuan         |
| G     | Total                |
| H     | Nomor Nota           |
| I     | Status Nota          |
| J     | Google Drive File ID |
| K     | Google Drive URL     |
| L     | Nama File            |
| M     | Email Penginput      |
| N     | Nama Penginput       |
| O     | Tanggal Dibuat       |
| P     | Tanggal Diubah       |
| Q     | Terakhir Diubah Oleh |
| R     | Status               |

---

# 4.6 Primary Key

Setiap transaksi memiliki ID unik.

Format

```text
TRX-202607-000001
```

Contoh

```text
TRX-202607-000254
```

Keuntungan:

- Tidak bergantung pada nomor baris Spreadsheet.
- Mudah dicari.
- Aman saat data berpindah.

ID tidak pernah berubah.

---

# 4.7 Struktur Sheet Users

| Kolom          | Keterangan  |
| -------------- | ----------- |
| ID             | Primary Key |
| Nama           |             |
| Username       |             |
| Password Hash  |             |
| Jabatan        |             |
| Status Aktif   |             |
| Tanggal Dibuat |             |
| Terakhir Login |             |

---

# 4.8 Struktur Sheet Categories

| Kolom         | Keterangan |
| ------------- | ---------- |
| ID            |            |
| Nama Kategori |            |
| Wajib Nota    |            |
| Status Aktif  |            |
| Urutan        |            |

Contoh

| Kategori            | Wajib Nota |
| ------------------- | ---------- |
| Transport           | Tidak      |
| Insentif & Bisyaroh | Tidak      |
| Lain-lain           | Tidak      |
| ATK                 | Ya         |
| Konsumsi            | Ya         |

Dengan cara ini aturan tidak ditulis di kode React, tetapi berasal dari data sehingga mudah diubah tanpa mengubah aplikasi.

---

# 4.9 Struktur Sheet Settings

| Key                    | Value |
| ---------------------- | ----- |
| Nama Organisasi        |       |
| Logo                   |       |
| Folder Google Drive    |       |
| Tahun Aktif            |       |
| Tema Default           |       |
| Ukuran Maksimal Upload |       |
| Format Nominal         |       |
| Format Tanggal         |       |

Semua konfigurasi aplikasi disimpan di sini.

---

# 4.10 Struktur Sheet AuditLog

| Kolom         | Isi |
| ------------- | --- |
| ID            |     |
| Tanggal       |     |
| Pengguna      |     |
| Aksi          |     |
| Sheet         |     |
| ID Transaksi  |     |
| Data Lama     |     |
| Data Baru     |     |
| IP (opsional) |     |

AuditLog hanya dapat ditambah.

Tidak boleh diubah maupun dihapus melalui aplikasi.

---

# 4.11 Struktur Folder Google Drive

```text
Bukti Pengeluaran

│
├── 2026
│      │
│      ├──01
│      ├──02
│      ├──03
│      ├──04
│      ├──05
│      ├──06
│      ├──07
│      ├──08
│      ├──09
│      ├──10
│      ├──11
│      └──12
│
└──2027
```

Folder dibuat otomatis jika belum tersedia.

---

# 4.12 Penamaan File Upload

Nama file dibuat otomatis.

Format

```text
TRX-202607-000015.jpg
```

atau

```text
20260714-084512.jpg
```

Nama file tidak menggunakan nama asli pengguna.

Hal ini menghindari duplikasi nama file.

---

# 4.13 Jenis File

Format yang diizinkan

- JPG
- JPEG
- PNG
- WEBP
- PDF (opsional untuk versi berikutnya)

File selain format tersebut ditolak.

---

# 4.14 Validasi Upload

Maksimum

10 MB

↓

Sistem melakukan kompresi otomatis.

↓

Target ukuran

≤ 500 KB

↓

Upload ke Google Drive.

---

# 4.15 Relasi Data

```text
Users

↓

Transactions

↓

Categories

↓

Google Drive File
```

Satu transaksi memiliki:

- satu kategori
- satu penginput
- satu bukti transaksi (versi 1)

Arsitektur tetap memungkinkan penambahan banyak bukti pada versi berikutnya.

---

# 4.16 Dashboard Data Source

Dashboard tidak menggunakan satu sheet tetap.

Dashboard membaca

```text
2026-01

2026-02

2026-03

...
```

sesuai kebutuhan.

Jika pengguna memilih

```text
Juli 2026
```

Dashboard hanya membaca

```text
2026-07
```

Jika memilih

```text
Tahun 2026
```

Dashboard menggabungkan seluruh sheet

```text
2026-01

hingga

2026-12
```

---

# 4.17 Strategi Pembacaan Data

Untuk menjaga performa:

- Tidak membaca seluruh Spreadsheet saat login.
- Dashboard hanya mengambil data sesuai filter.
- Pagination dilakukan di API.
- Search dilakukan di API.
- Statistik dihitung di API.

Frontend hanya menerima data yang diperlukan.

---

# 4.18 Backup

Tersedia menu

**Backup Data**

Fitur:

- Download Spreadsheet (.xlsx)
- Download CSV
- Backup seluruh folder bukti (tautan atau arsip sesuai kemampuan Google Drive)
- Backup metadata aplikasi

---

# 4.19 Restore

Admin dapat:

- Import kembali data dari file Excel/CSV.
- Memulihkan data ke sheet yang sesuai berdasarkan bulan.
- Memvalidasi struktur data sebelum proses impor.

---

# 4.20 Integritas Data

Sistem harus memastikan:

- ID transaksi unik.
- Tidak ada transaksi tanpa tanggal.
- Tidak ada transaksi tanpa kategori.
- Total selalu dihitung otomatis.
- File Google Drive sesuai dengan transaksi.
- Tidak ada transaksi yatim (data tanpa referensi file jika seharusnya memiliki bukti).

---

# 4.21 Retensi Data

- Data transaksi tidak dihapus secara permanen secara otomatis.
- Data tetap tersimpan selama Spreadsheet tersedia.
- Jika transaksi dihapus, tindakan tersebut dicatat pada AuditLog.
- Penghapusan file di Google Drive mengikuti status transaksi agar tidak meninggalkan file yang tidak terpakai.

---

# 4.22 Skalabilitas

Struktur data dirancang agar mudah dipindahkan ke:

- MySQL
- PostgreSQL
- Supabase
- Firebase
- SQL Server

Tanpa mengubah struktur frontend secara signifikan karena seluruh akses dilakukan melalui REST API.

---

# Penutup Bagian 4

Arsitektur data menggunakan kombinasi **Google Spreadsheet**, **Google Drive**, dan **Google Apps Script** untuk memberikan solusi yang sederhana namun tetap terstruktur. Pemisahan **1 bulan = 1 sheet**, penggunaan **ID transaksi unik**, pengelolaan folder Drive per tahun dan bulan, serta penyimpanan konfigurasi dalam sheet khusus membuat sistem mudah dipelihara, aman, dan siap berkembang jika di kemudian hari diperlukan migrasi ke database relasional yang lebih besar.

# Product Requirements Document (PRD)

# Bagian 5 — Backend API Specification (Google Apps Script)

---

# 5.1 Tujuan

Google Apps Script (GAS) berfungsi sebagai **Backend REST API** yang menghubungkan aplikasi React dengan Google Spreadsheet dan Google Drive.

Google Apps Script bertanggung jawab untuk:

- Autentikasi pengguna
- Validasi data
- Membaca Spreadsheet
- Menulis Spreadsheet
- Upload file ke Google Drive
- Mengelola Sheet Bulanan
- Menghasilkan laporan
- Mengelola kategori
- Mengelola pengguna
- Audit Log
- Dashboard Analytics

Frontend **tidak diperbolehkan** mengakses Google Spreadsheet maupun Google Drive secara langsung.

---

# 5.2 Arsitektur Backend

```text
                    React + Vite
                          │
                      Axios (HTTPS)
                          │
                Google Apps Script API
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
 Google Spreadsheet   Google Drive      Cache Service
        │
        ▼
  Data Transaksi
```

Semua proses bisnis berada di Google Apps Script.

---

# 5.3 Prinsip REST API

Seluruh endpoint menggunakan format JSON.

Response selalu konsisten.

Contoh sukses:

```json
{
  "success": true,
  "message": "Data berhasil disimpan",
  "data": {}
}
```

Contoh gagal:

```json
{
  "success": false,
  "message": "Kategori tidak ditemukan"
}
```

---

# 5.4 Standar Response

Semua endpoint harus mengembalikan:

| Field     | Keterangan     |
| --------- | -------------- |
| success   | Status request |
| message   | Pesan          |
| data      | Data utama     |
| timestamp | Waktu server   |

---

# 5.5 Modul Authentication

## Login

Fungsi

- Validasi Username
- Validasi Password
- Membuat Session
- Mengembalikan data pengguna

---

## Logout

Menghapus session pengguna.

---

## Change Password

Mengubah password pengguna.

Password disimpan dalam bentuk hash.

---

# 5.6 Modul Dashboard

Endpoint dashboard mengembalikan

- Total Pengeluaran
- Total Hari Ini
- Total Minggu Ini
- Total Bulan
- Jumlah Transaksi
- Grafik Batang
- Pie Chart
- Line Chart
- Area Chart
- Aktivitas Terakhir
- Pengeluaran Terbesar

Dashboard tidak membaca semua data jika tidak diperlukan.

---

# 5.7 Modul Transaksi

## Create

Menyimpan transaksi baru.

Langkah

1.

Validasi data.

↓

2.

Hitung Total.

↓

3.

Upload Bukti.

↓

4.

Simpan ke Spreadsheet.

↓

5.

Audit Log.

↓

6.

Kembalikan Response.

---

## Read

Mengambil transaksi.

Support

- Pagination
- Search
- Filter
- Sorting

---

## Update

Mengubah transaksi.

Jika bukti diganti.

↓

Upload file baru.

↓

Hapus file lama (opsional sesuai pengaturan).

↓

Update Spreadsheet.

↓

Audit Log.

---

## Delete

Menghapus transaksi.

↓

Audit Log.

↓

Hapus file Google Drive (opsional).

---

# 5.8 Modul Upload Bukti

Tahapan

Upload diterima.

↓

Validasi format.

↓

Validasi ukuran.

↓

Kompresi gambar.

↓

Membuat folder jika belum ada.

↓

Upload Google Drive.

↓

Mengembalikan

- File ID
- URL
- Nama File

---

# 5.9 Folder Management

Jika

```text
2026/07
```

belum ada.

↓

API membuat folder otomatis.

↓

Upload dilakukan ke folder tersebut.

---

# 5.10 Modul Sheet Management

Saat transaksi disimpan.

↓

API mengecek

```text
2026-07
```

↓

Jika belum ada.

↓

Copy

```text
Template
```

↓

Rename

```text
2026-07
```

↓

Simpan transaksi.

---

# 5.11 Modul Kategori

Fungsi

- List
- Tambah
- Edit
- Hapus
- Aktif
- Nonaktif

Kategori berasal dari Spreadsheet.

Tidak ditulis di React.

---

# 5.12 Modul Pengguna

Fitur

- List
- Tambah
- Edit
- Ubah Password
- Aktif
- Nonaktif

---

# 5.13 Modul Audit Log

Semua aktivitas dicatat.

Contoh

```text
LOGIN

CREATE

UPDATE

DELETE

EXPORT

PRINT
```

Audit tidak dapat diubah.

---

# 5.14 Modul Export

API menghasilkan

- PDF
- Excel
- CSV

Berdasarkan filter.

Contoh

```text
Juli 2026

Kategori

Transport
```

↓

PDF hanya berisi

Transport

Juli 2026.

---

# 5.15 Modul Print

Menghasilkan

Print Ready HTML.

Frontend hanya membuka Print Dialog.

---

# 5.16 Modul Dashboard Analytics

Menghasilkan

- Total Bulan
- Total Tahun
- Total Kategori
- Grafik
- Statistik

Perhitungan dilakukan di API.

Frontend hanya menampilkan.

---

# 5.17 Search Engine

API mendukung

Search

Pada

- Uraian
- Kategori
- Nomor Nota
- Penginput

Search tidak dilakukan di Frontend.

---

# 5.18 Pagination

API mengembalikan

```text
Total Data

Total Halaman

Halaman Aktif

Data
```

Frontend tidak mengambil seluruh data sekaligus.

---

# 5.19 Sorting

Support

Ascending

Descending

Pada

- Tanggal
- Total
- Nama Barang
- Kategori

---

# 5.20 Filtering

API mendukung

- Bulan
- Tahun
- Rentang Tanggal
- Penginput
- Kategori
- Nominal Minimum
- Nominal Maksimum
- Ada Bukti
- Tanpa Bukti

Filter dapat digabungkan.

---

# 5.21 Validasi

Semua validasi dilakukan di Backend.

Contoh

Tanggal wajib.

Kategori wajib.

Volume > 0

Harga > 0

Nomor Nota wajib

(kecuali kategori tertentu)

---

# 5.22 Error Handling

Jika Spreadsheet gagal.

↓

Response

```json
{
  "success": false,
  "message": "Spreadsheet tidak dapat diakses."
}
```

Jika Google Drive gagal.

↓

Upload dibatalkan.

↓

Transaksi tidak disimpan.

---

# 5.23 Logging

Semua request penting dicatat.

- Login
- Logout
- Export
- Print
- Upload
- Delete
- Error

---

# 5.24 Cache

Menggunakan

Google Apps Script Cache Service.

Cache

- Dashboard
- Kategori
- Settings

Mengurangi pembacaan Spreadsheet.

---

# 5.25 Security

- HTTPS wajib.
- Password di-hash.
- Validasi seluruh input.
- Sanitasi data sebelum ditulis ke Spreadsheet.
- Ukuran upload dibatasi.
- Format file divalidasi.
- Session memiliki masa berlaku.

---

# 5.26 Konfigurasi API

Semua konfigurasi berada di

Sheet

```text
Settings
```

Contoh

- Folder Drive
- Tahun Aktif
- Maksimum Upload
- Nama Organisasi

Sehingga perubahan tidak memerlukan deploy ulang.

---

# 5.27 Monitoring

API menyediakan informasi kesehatan sistem.

Status

- Spreadsheet
- Google Drive
- Cache
- Waktu Respons

Ditampilkan pada halaman

System Status.

---

# 5.28 Future Ready

Backend dirancang menggunakan pola Service Layer sehingga logika bisnis dipisahkan berdasarkan modul:

- Authentication Service
- Transaction Service
- Category Service
- User Service
- Dashboard Service
- Export Service
- Drive Service
- Sheet Service
- Audit Service

Dengan pendekatan ini, jika di masa depan backend dipindahkan dari Google Apps Script ke Laravel, Node.js, NestJS, atau Supabase Edge Functions, frontend React tidak perlu mengalami perubahan besar karena tetap berkomunikasi melalui REST API yang konsisten.

---

# 5.29 Standar Kode Backend

Seluruh kode Google Apps Script harus mengikuti prinsip:

- Single Responsibility Principle (SRP)
- DRY (Don't Repeat Yourself)
- Modular dan mudah diuji
- Penamaan fungsi yang konsisten
- Tidak ada logika bisnis di file utama (`doGet()` atau `doPost()`)
- Seluruh konfigurasi dipusatkan pada satu file konfigurasi

Struktur proyek yang disarankan:

```text
/src
│
├── api/
├── services/
├── repositories/
├── validators/
├── helpers/
├── config/
├── middleware/
└── app.gs
```

Dengan struktur tersebut, proyek tetap mudah dipelihara walaupun jumlah endpoint dan fitur terus bertambah.

---

# Penutup Bagian 5

Backend menggunakan **Google Apps Script** sebagai REST API yang menjadi pusat seluruh proses bisnis aplikasi. Semua operasi—mulai dari autentikasi, pengelolaan transaksi, upload bukti ke Google Drive, pembuatan sheet bulanan, hingga analitik dashboard—dijalankan melalui backend ini. Pendekatan tersebut memastikan aplikasi tetap aman, modular, memiliki performa yang baik, dan siap berkembang ke arsitektur backend yang lebih besar tanpa mengubah frontend React secara signifikan.

# Product Requirements Document (PRD)

# Bagian 6 — Dashboard, Analytics & Reporting

---

# 6.1 Tujuan

Dashboard merupakan halaman utama aplikasi yang memberikan gambaran kondisi keuangan secara **real-time**, sehingga Ketua, Sekretaris, dan Bendahara dapat mengetahui kondisi keuangan organisasi tanpa harus membuka seluruh transaksi.

Dashboard harus:

- Cepat dimuat.
- Informatif.
- Mudah dipahami.
- Interaktif.
- Responsif di Android maupun Desktop.
- Menjadi pusat seluruh aktivitas aplikasi.

---

# 6.2 Tujuan Dashboard

Dashboard harus mampu menjawab pertanyaan berikut dalam waktu kurang dari 10 detik:

- Berapa total pengeluaran bulan ini?
- Berapa jumlah transaksi?
- Kategori apa yang paling banyak menghabiskan dana?
- Berapa rata-rata pengeluaran per hari?
- Siapa yang paling banyak melakukan input?
- Bagaimana tren pengeluaran dibanding bulan sebelumnya?
- Apakah terjadi kenaikan atau penurunan pengeluaran?

---

# 6.3 Layout Dashboard

## Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ Sidebar              Header                                 │
├──────────────────────────────────────────────────────────────┤
│ KPI 1 │ KPI 2 │ KPI 3 │ KPI 4 │ KPI 5 │ KPI 6               │
├──────────────────────────────────────────────────────────────┤
│                 Line Chart (Trend Bulanan)                  │
├───────────────────────────────┬──────────────────────────────┤
│ Grafik Batang                 │ Pie / Donut Chart           │
├───────────────────────────────┴──────────────────────────────┤
│ Aktivitas Terbaru │ Transaksi Terbaru │ Pengeluaran Terbesar │
├──────────────────────────────────────────────────────────────┤
│                  Tabel Transaksi Terbaru                    │
└──────────────────────────────────────────────────────────────┘
```

---

## Android

```text
Dashboard

[KPI]

[KPI]

[KPI]

Line Chart

Bar Chart

Pie Chart

Aktivitas

Transaksi Terbaru

Bottom Navigation
```

Dashboard Android menggunakan satu kolom agar mudah digulir.

---

# 6.4 KPI (Key Performance Indicator)

Bagian paling atas dashboard menampilkan kartu statistik.

| KPI                          | Keterangan                            |
| ---------------------------- | ------------------------------------- |
| Total Pengeluaran Bulan Ini  | Total seluruh transaksi bulan aktif   |
| Total Pengeluaran Hari Ini   | Total transaksi hari berjalan         |
| Jumlah Transaksi             | Banyaknya transaksi                   |
| Rata-rata Pengeluaran Harian | Total dibagi jumlah hari aktif        |
| Kategori Terbesar            | Kategori dengan nominal tertinggi     |
| Pengguna Teraktif            | Pengguna dengan transaksi terbanyak   |
| Pengeluaran Terbesar         | Nominal transaksi terbesar            |
| Selisih Bulan Lalu           | Naik/Turun dibanding bulan sebelumnya |

Setiap kartu memiliki ikon, warna indikator, dan animasi saat nilai berubah.

---

# 6.5 Filter Dashboard

Dashboard menyediakan filter global.

## Filter

- Bulan
- Tahun
- Rentang Tanggal
- Kategori
- Pengguna

Perubahan filter akan memperbarui seluruh widget secara otomatis tanpa memuat ulang halaman.

---

# 6.6 Grafik Line (Trend)

Menampilkan perkembangan total pengeluaran.

Mode:

- Harian
- Mingguan
- Bulanan
- Tahunan

Contoh:

```text
1 Jul
5 Jul
10 Jul
15 Jul
20 Jul
25 Jul
31 Jul
```

Grafik digunakan untuk melihat tren kenaikan atau penurunan pengeluaran.

---

# 6.7 Grafik Batang

Digunakan untuk membandingkan total pengeluaran berdasarkan kategori.

Contoh:

| Kategori  |       Total |
| --------- | ----------: |
| ATK       | Rp2.500.000 |
| Transport | Rp1.200.000 |
| Bisyaroh  | Rp8.500.000 |
| Konsumsi  | Rp4.100.000 |

Klik salah satu batang akan memfilter seluruh dashboard berdasarkan kategori tersebut.

---

# 6.8 Pie / Donut Chart

Menampilkan persentase pengeluaran.

Contoh

```text
Bisyaroh

45%

ATK

15%

Transport

12%

Konsumsi

18%

Lainnya

10%
```

Jumlah seluruh persentase harus selalu 100%.

---

# 6.9 Area Chart

Menampilkan akumulasi pengeluaran selama bulan berjalan.

Grafik ini membantu melihat percepatan pengeluaran dari waktu ke waktu.

---

# 6.10 Dashboard Interaktif

Semua grafik bersifat interaktif.

Contoh:

Klik kategori

↓

Dashboard otomatis difilter.

Klik bulan

↓

Seluruh grafik berubah.

Klik pengguna

↓

Transaksi pengguna tersebut ditampilkan.

Tidak diperlukan tombol "Cari".

---

# 6.11 Widget Aktivitas Terbaru

Menampilkan aktivitas terbaru.

Contoh

| Waktu | Aktivitas                   |
| ----- | --------------------------- |
| 08.30 | Mustofa menambah transaksi  |
| 08.45 | Sekretaris mengubah nominal |
| 09.15 | Ketua menghapus transaksi   |

Maksimum 20 aktivitas terakhir.

---

# 6.12 Widget Transaksi Terbaru

Menampilkan 10 transaksi terakhir.

Kolom:

- Tanggal
- Kategori
- Uraian
- Total
- Penginput

Klik transaksi membuka halaman detail.

---

# 6.13 Widget Pengeluaran Terbesar

Menampilkan transaksi dengan nominal terbesar pada periode yang dipilih.

Informasi:

- Nama Barang
- Kategori
- Nominal
- Penginput
- Tanggal

---

# 6.14 Widget Bukti Terbaru

Menampilkan foto nota terakhir yang diunggah.

Klik gambar:

- Preview
- Zoom
- Download

---

# 6.15 Ringkasan Bulanan

Saat memilih bulan tertentu.

Dashboard menampilkan:

- Total Pengeluaran
- Jumlah Transaksi
- Total per Kategori
- Pengeluaran Terbesar
- Hari dengan Pengeluaran Tertinggi
- Hari Tanpa Transaksi

---

# 6.16 Ringkasan Tahunan

Saat memilih satu tahun.

Dashboard membaca seluruh sheet:

```text
2026-01

2026-02

...

2026-12
```

Menampilkan:

- Total Tahunan
- Rata-rata Bulanan
- Bulan Terbesar
- Bulan Terkecil
- Grafik 12 Bulan

---

# 6.17 Analisis Pengguna

Menampilkan statistik setiap pengguna.

| Nama       | Jumlah Input | Total Nominal |
| ---------- | -----------: | ------------: |
| Ketua      |           20 |   Rp2.500.000 |
| Sekretaris |           85 |   Rp9.000.000 |
| Bendahara  |          150 |  Rp18.000.000 |

---

# 6.18 Analisis Kategori

Menampilkan:

- Jumlah transaksi
- Total nominal
- Persentase
- Rata-rata transaksi

Kategori dapat diurutkan berdasarkan nominal terbesar.

---

# 6.19 Pencarian Dashboard

Pencarian bersifat global.

Mencari:

- Nama Barang
- Kategori
- Pengguna
- Nomor Nota

Hasil langsung ditampilkan tanpa memuat ulang halaman.

---

# 6.20 Dashboard Real-Time

Setelah transaksi:

- Ditambah
- Diubah
- Dihapus

Dashboard harus langsung diperbarui.

Target pembaruan maksimal **2 detik** setelah transaksi berhasil disimpan.

---

# 6.21 Empty State

Jika belum ada transaksi pada periode yang dipilih.

Dashboard menampilkan:

- Ilustrasi
- Pesan:

"Tidak ada transaksi pada periode ini."

Tombol:

**Tambah Transaksi**

---

# 6.22 Export Dashboard

Dashboard dapat diekspor menjadi:

- PDF
- Excel
- CSV

Export mengikuti filter aktif.

Contoh:

```
Kategori = Transport

Bulan = Juli
```

↓

Laporan hanya berisi data tersebut.

---

# 6.23 Print Dashboard

Dashboard dapat dicetak dalam format A4.

Isi laporan:

- Logo Organisasi
- Nama Organisasi
- Periode
- Ringkasan KPI
- Grafik
- Tabel Ringkasan
- Tanggal Cetak
- Tanda Tangan Ketua
- Tanda Tangan Sekretaris
- Tanda Tangan Bendahara

---

# 6.24 Performa Dashboard

Target performa:

| Parameter         | Target    |
| ----------------- | --------- |
| Membuka Dashboard | < 2 detik |
| Mengganti Filter  | < 1 detik |
| Memuat Grafik     | < 1 detik |
| Search            | < 500 ms  |
| Refresh Data      | < 2 detik |

---

# 6.25 Optimasi Performa

Untuk menjaga dashboard tetap cepat:

- Menggunakan cache untuk data statistik.
- Hanya mengambil data sesuai filter.
- Pagination dilakukan di backend.
- Statistik dihitung di Google Apps Script.
- Grafik hanya memuat data yang diperlukan.
- Lazy loading untuk widget di bawah layar.

---

# 6.26 Dashboard Responsif

### Desktop

- Sidebar tetap.
- Grid 2–4 kolom.
- Grafik berdampingan.
- Tabel penuh.

### Tablet

- Grid 2 kolom.
- Grafik menyesuaikan ukuran.

### Android

- Semua komponen menjadi satu kolom.
- Grafik dapat digeser jika diperlukan.
- Tabel menggunakan mode kartu atau scroll horizontal yang tetap nyaman digunakan.

---

# 6.27 Future Analytics

Arsitektur dashboard harus memungkinkan penambahan fitur berikut tanpa mengubah struktur utama:

- Prediksi pengeluaran bulan berikutnya.
- Perbandingan antar tahun.
- Analisis tren kategori.
- Target anggaran vs realisasi.
- Notifikasi jika pengeluaran melebihi batas tertentu.
- Dashboard khusus Ketua dengan ringkasan eksekutif.

---

# 6.28 Business Intelligence

Dashboard dirancang tidak hanya sebagai tampilan data, tetapi juga sebagai alat bantu pengambilan keputusan.

Pengguna dapat:

- Mengidentifikasi kategori dengan pengeluaran tertinggi.
- Menemukan pola pengeluaran.
- Membandingkan performa setiap bulan.
- Melihat kontribusi setiap pengguna.
- Menyiapkan laporan rapat bulanan hanya dari dashboard.

---

# Penutup Bagian 6

Dashboard merupakan pusat informasi aplikasi yang menggabungkan **KPI, grafik interaktif, analitik, aktivitas pengguna, dan laporan** dalam satu halaman yang cepat, responsif, dan mudah dipahami. Seluruh data ditampilkan secara real-time berdasarkan filter yang dipilih, sehingga Ketua, Sekretaris, dan Bendahara dapat memantau kondisi keuangan organisasi secara akurat baik melalui perangkat Android maupun desktop.

# Product Requirements Document (PRD)

# Bagian 7 — Reporting, Export, Print & Document Generation

---

# 7.1 Tujuan

Modul Reporting bertujuan menghasilkan laporan keuangan yang **profesional, akurat, mudah dibagikan, dan siap dicetak** tanpa perlu melakukan pengolahan data secara manual.

Laporan harus dapat dihasilkan dalam hitungan detik berdasarkan filter yang dipilih pengguna.

---

# 7.2 Jenis Laporan

Sistem menyediakan beberapa jenis laporan.

| Jenis Laporan                | Keterangan                            |
| ---------------------------- | ------------------------------------- |
| Laporan Bulanan              | Seluruh transaksi dalam satu bulan    |
| Laporan Tahunan              | Rekap seluruh bulan dalam satu tahun  |
| Laporan Per Kategori         | Transaksi berdasarkan kategori        |
| Laporan Per Pengguna         | Transaksi berdasarkan penginput       |
| Laporan Rentang Tanggal      | Transaksi sesuai tanggal yang dipilih |
| Laporan Tanpa Nota           | Seluruh transaksi tanpa nota          |
| Laporan Pengeluaran Terbesar | Transaksi dengan nominal tertinggi    |
| Laporan Aktivitas Pengguna   | Riwayat aktivitas pengguna            |

---

# 7.3 Filter Laporan

Seluruh laporan dapat difilter menggunakan kombinasi berikut:

- Bulan
- Tahun
- Rentang Tanggal
- Kategori
- Pengguna
- Nominal Minimum
- Nominal Maksimum
- Ada Bukti
- Tanpa Bukti
- Status Nota

Filter dapat digunakan secara bersamaan.

---

# 7.4 Export PDF

Laporan PDF menggunakan format resmi organisasi.

Ukuran kertas:

- A4 Portrait
- A4 Landscape (otomatis jika tabel terlalu lebar)

Margin:

- Atas: 20 mm
- Bawah: 20 mm
- Kiri: 15 mm
- Kanan: 15 mm

---

# 7.5 Struktur PDF

## Header

Menampilkan:

- Logo Organisasi
- Nama Organisasi
- Judul Laporan
- Periode
- Tanggal Cetak
- Dicetak Oleh

---

## Ringkasan

Menampilkan:

- Total Pengeluaran
- Jumlah Transaksi
- Jumlah Kategori
- Pengeluaran Terbesar
- Pengeluaran Rata-rata

---

## Grafik

Jika dipilih pengguna.

Menampilkan

- Grafik Batang
- Pie Chart
- Line Chart

Grafik memiliki kualitas tinggi agar tetap jelas saat dicetak.

---

## Tabel

Kolom:

| Tanggal | Kategori | Uraian | Volume | Harga | Total | Nota |
| ------- | -------- | ------ | ------ | ----- | ----- | ---- |

Nominal menggunakan format Rupiah.

---

## Footer

Menampilkan:

- Nomor Halaman
- Waktu Cetak
- Nama Sistem
- Versi Aplikasi

---

## Tanda Tangan

Disediakan area tanda tangan.

| Ketua | Sekretaris | Bendahara |
| ----- | ---------- | --------- |

---

# 7.6 Export Excel

Format

.xlsx

Fitur:

- Format tabel
- Auto Width
- Bold Header
- Freeze Header
- Filter Excel
- Format Rupiah
- Format Tanggal

Nama sheet mengikuti periode laporan.

Contoh

```text
2026-07
```

---

# 7.7 Export CSV

CSV menggunakan format UTF-8.

Kolom mengikuti tabel transaksi.

Tidak menyimpan format warna.

Kompatibel dengan:

- Microsoft Excel
- LibreOffice
- Google Spreadsheet

---

# 7.8 Print

Print menggunakan CSS khusus.

Target:

- Tidak ada elemen navigasi.
- Tidak ada sidebar.
- Tidak ada tombol.
- Tidak ada scrollbar.

Hanya informasi laporan yang dicetak.

---

# 7.9 Preview Laporan

Sebelum export.

Pengguna dapat melihat preview.

Preview menampilkan:

- Header
- Ringkasan
- Grafik
- Tabel
- Footer

Pengguna dapat memilih:

- Download
- Print
- Batal

---

# 7.10 Nama File Export

Format standar.

PDF

```text
Laporan_2026-07.pdf
```

Excel

```text
Laporan_2026-07.xlsx
```

CSV

```text
Laporan_2026-07.csv
```

Jika menggunakan filter kategori.

```text
Laporan_Transport_2026-07.pdf
```

---

# 7.11 Laporan Bulanan

Isi:

- Ringkasan
- Grafik
- Daftar transaksi
- Total per kategori
- Total keseluruhan

Diambil dari satu sheet bulanan.

Contoh

```text
2026-07
```

---

# 7.12 Laporan Tahunan

Menggabungkan seluruh sheet dalam satu tahun.

Contoh

```text
2026-01

hingga

2026-12
```

Menampilkan:

- Rekap per bulan
- Grafik tahunan
- Total tahunan
- Persentase setiap bulan

---

# 7.13 Laporan Per Kategori

Contoh

Kategori

Transport

↓

Menampilkan:

Seluruh transaksi Transport.

Total Transport.

Persentase Transport.

---

# 7.14 Laporan Pengguna

Menampilkan:

- Jumlah transaksi
- Total nominal
- Rata-rata transaksi

Untuk setiap pengguna.

---

# 7.15 Laporan Tanpa Nota

Menampilkan seluruh transaksi dengan status:

```text
PENGELUARAN TANPA NOTA
```

Laporan ini sangat membantu saat proses pemeriksaan administrasi.

---

# 7.16 Rekap Kategori

Menampilkan tabel.

| Kategori | Jumlah Transaksi | Total | Persentase |
| -------- | ---------------: | ----: | ---------: |

Diurutkan berdasarkan nominal terbesar.

---

# 7.17 Rekap Harian

Menampilkan:

Tanggal

Jumlah Transaksi

Total

Rata-rata

Grafik Harian

---

# 7.18 Rekap Mingguan

Menampilkan total setiap minggu.

Digunakan untuk melihat tren pengeluaran.

---

# 7.19 Rekap Bulanan

Menampilkan:

- Total Bulan
- Pengeluaran Terbesar
- Pengeluaran Terkecil
- Hari Terbanyak Transaksi

---

# 7.20 Rekap Tahunan

Menampilkan:

- Total Tahun
- Bulan Terbesar
- Bulan Terkecil
- Kategori Terbesar
- Pengguna Teraktif

---

# 7.21 Watermark

PDF memiliki watermark kecil.

Contoh

```text
Generated by Financial Reporting System
```

Watermark tidak mengganggu isi laporan.

---

# 7.22 QR Code Verifikasi (Versi 1)

Setiap PDF memiliki QR Code di bagian footer.

QR Code berisi:

- ID Laporan
- Periode
- Waktu Generate

Tujuan:

Memudahkan pelacakan dokumen jika dicetak atau dibagikan.

---

# 7.23 Nomor Laporan

Setiap laporan memiliki nomor unik.

Format

```text
RPT-202607-0001
```

Nomor ini tampil pada PDF dan halaman riwayat laporan.

---

# 7.24 Riwayat Export

Setiap export dicatat.

Data yang disimpan:

- Tanggal
- Pengguna
- Jenis Export
- Filter
- Jumlah Data

Semua masuk ke Audit Log.

---

# 7.25 Riwayat Print

Setiap proses print dicatat.

Informasi:

- Pengguna
- Periode
- Waktu
- Jenis Laporan

---

# 7.26 Empty Report

Jika tidak ada data.

Laporan tetap dibuat.

Isi:

"Tidak terdapat transaksi pada periode yang dipilih."

---

# 7.27 Performa

Target

| Aktivitas      | Target    |
| -------------- | --------- |
| Generate PDF   | <10 detik |
| Generate Excel | <5 detik  |
| Generate CSV   | <3 detik  |
| Print Preview  | <3 detik  |

---

# 7.28 Keamanan

Pengguna hanya dapat membuat laporan setelah login.

Semua file dihasilkan secara dinamis.

Tidak ada laporan yang disimpan permanen di server.

---

# 7.29 Future Enhancement

Arsitektur laporan harus mendukung:

- Template laporan yang dapat dikustomisasi.
- Penambahan logo organisasi melalui halaman Pengaturan.
- Kop surat otomatis.
- Tanda tangan digital.
- Stempel digital organisasi.
- Pengiriman laporan melalui email.
- Penjadwalan laporan bulanan otomatis.
- Perbandingan dua periode dalam satu laporan.
- Lampiran seluruh bukti transaksi dalam bentuk daftar tautan atau lampiran terkompresi.

---

# 7.30 Business Rules

- Seluruh laporan menggunakan data terbaru dari Google Spreadsheet.
- Export selalu mengikuti filter yang sedang aktif.
- Nominal ditampilkan dalam format Rupiah.
- Kolom yang bersifat teknis (ID Google Drive, File ID, Hash Password, dll.) tidak boleh muncul pada laporan.
- Semua laporan harus konsisten dengan identitas visual organisasi (logo, nama, warna, dan format).

---

# Penutup Bagian 7

Modul Reporting dirancang sebagai fasilitas pelaporan profesional yang mampu menghasilkan **PDF, Excel, CSV, dan dokumen siap cetak** dengan cepat dan konsisten. Dukungan filter yang lengkap, rekapitulasi otomatis, QR Code verifikasi, riwayat export, serta struktur laporan yang formal menjadikan sistem ini tidak hanya sebagai alat pencatatan, tetapi juga sebagai sarana penyusunan laporan resmi yang siap digunakan dalam rapat, pertanggungjawaban, maupun proses audit.

# Product Requirements Document (PRD)

# Bagian 8 — Security, Performance, Responsive Design & System Quality

---

# 8.1 Tujuan

Bagian ini mendefinisikan standar keamanan, performa, kualitas sistem, serta pengalaman penggunaan agar aplikasi tetap cepat, aman, stabil, dan nyaman digunakan baik pada perangkat Android maupun Desktop.

Seluruh standar pada bagian ini wajib dipenuhi sebelum aplikasi dinyatakan siap digunakan (production ready).

---

# 8.2 Prinsip Utama

Sistem harus memenuhi empat prinsip utama:

- **Secure** → Data terlindungi.
- **Fast** → Respon aplikasi cepat.
- **Reliable** → Stabil dan minim gangguan.
- **Responsive** → Nyaman digunakan di semua ukuran layar.

---

# 8.3 Keamanan Sistem

## Login

- Seluruh pengguna wajib login.
- Password tidak disimpan dalam bentuk teks biasa.
- Password disimpan dalam bentuk hash.
- Session memiliki masa berlaku.
- Logout menghapus seluruh session aktif.

---

## Hak Akses

Pada versi pertama terdapat tiga pengguna:

- Ketua
- Sekretaris
- Bendahara

Semua memiliki hak akses yang sama.

Namun sistem tetap mencatat:

- Dibuat oleh
- Terakhir diubah oleh
- Waktu perubahan

untuk setiap transaksi.

---

## Validasi Input

Semua input divalidasi.

Contoh:

Tanggal wajib.

Kategori wajib.

Volume harus lebih besar dari nol.

Harga harus lebih besar dari nol.

Nominal tidak boleh negatif.

---

## Sanitasi Data

Backend harus membersihkan seluruh data sebelum disimpan.

Mencegah:

- Script Injection
- HTML Injection
- Formula Injection pada Spreadsheet
- Karakter ilegal

---

## Validasi File Upload

Hanya menerima:

- JPG
- JPEG
- PNG
- WEBP

Ukuran maksimum:

10 MB

Setelah dikompresi:

≤ 500 KB

File yang tidak sesuai langsung ditolak.

---

# 8.4 Audit & Traceability

Setiap aktivitas penting wajib tercatat.

Contoh:

- Login
- Logout
- Tambah transaksi
- Edit transaksi
- Hapus transaksi
- Export PDF
- Export Excel
- Export CSV
- Print
- Ganti password
- Tambah kategori

Audit Log tidak dapat diedit melalui aplikasi.

---

# 8.5 Backup Data

Aplikasi menyediakan menu Backup.

Jenis Backup:

- Spreadsheet (.xlsx)
- CSV
- Metadata
- Daftar file Google Drive

Backup dapat dilakukan kapan saja.

---

# 8.6 Restore Data

Sistem mendukung proses pemulihan data.

Fitur:

- Import Excel
- Import CSV
- Validasi struktur
- Deteksi duplikasi
- Konfirmasi sebelum proses restore

---

# 8.7 Performa Aplikasi

Target performa minimum.

| Aktivitas       | Target     |
| --------------- | ---------- |
| Login           | < 2 detik  |
| Dashboard       | < 2 detik  |
| Search          | < 500 ms   |
| Filter          | < 500 ms   |
| Input Transaksi | < 3 detik  |
| Upload Bukti    | < 5 detik  |
| Export PDF      | < 10 detik |
| Export Excel    | < 5 detik  |
| Print Preview   | < 3 detik  |

---

# 8.8 Optimasi Performa

Frontend harus menerapkan:

- Code Splitting
- Lazy Loading
- Image Compression
- Tree Shaking
- Minification
- Asset Caching

Backend harus menerapkan:

- Cache Service
- Pagination
- Filtering di server
- Perhitungan statistik di backend

---

# 8.9 Loading Strategy

Semua halaman menggunakan Skeleton Loading.

Spinner penuh hanya digunakan untuk:

- Upload file
- Export
- Login

Halaman tidak boleh terlihat kosong saat proses loading.

---

# 8.10 Caching

Data berikut dapat disimpan sementara:

- Kategori
- Pengguna
- Dashboard
- Settings

Cache akan diperbarui ketika terjadi perubahan data.

---

# 8.11 Error Handling

Sistem harus mampu menangani:

- Internet terputus
- Spreadsheet tidak tersedia
- Google Drive gagal
- Session habis
- Timeout
- Upload gagal

Pesan kesalahan harus mudah dipahami oleh pengguna.

---

# 8.12 Notifikasi

Jenis notifikasi:

Success

```text
✔ Transaksi berhasil disimpan
```

Warning

```text
⚠ Mohon lengkapi data yang wajib diisi
```

Error

```text
❌ Upload gagal. Silakan coba kembali
```

Info

```text
ℹ Tidak ada transaksi pada periode ini
```

---

# 8.13 Responsive Design

Aplikasi menggunakan pendekatan:

**Mobile First**

---

## Android

Layout:

- Bottom Navigation
- Floating Action Button
- Card Layout
- Full Width Form
- Bottom Sheet

Semua tombol mudah dijangkau menggunakan satu tangan.

---

## Tablet

Layout:

- Grid dua kolom
- Sidebar dapat disembunyikan
- Grafik lebih besar

---

## Desktop

Layout:

- Sidebar permanen
- Multi Column Dashboard
- Drawer Detail
- Hover Interaction

---

# 8.14 Breakpoint

| Perangkat | Ukuran       |
| --------- | ------------ |
| Mobile    | 0–639 px     |
| Tablet    | 640–1023 px  |
| Laptop    | 1024–1439 px |
| Desktop   | ≥1440 px     |

Semua halaman harus menyesuaikan secara otomatis.

---

# 8.15 Browser Support

Aplikasi mendukung:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

Minimal dua versi terakhir yang masih didukung masing-masing browser.

---

# 8.16 Android Support

Minimal:

Android 9

Optimal:

Android 12 ke atas

Browser utama:

Google Chrome

---

# 8.17 Accessibility

Aplikasi mengikuti prinsip dasar aksesibilitas.

- Kontras warna tinggi.
- Ukuran font minimal 14 px.
- Fokus keyboard terlihat jelas.
- Label pada seluruh input.
- Ikon memiliki tooltip (desktop) atau label (mobile).
- Navigasi dapat digunakan tanpa kebingungan.

Target mengacu pada praktik terbaik WCAG 2.1 level AA untuk aspek-aspek utama.

---

# 8.18 Dark Mode

Mendukung:

- Light
- Dark
- Auto (mengikuti sistem)

Tema disimpan pada browser.

---

# 8.19 Konsistensi UI

Semua komponen berasal dari Design System.

Tidak diperbolehkan menggunakan desain yang berbeda pada halaman lain.

Button.

Input.

Modal.

Drawer.

Table.

Toast.

Card.

Semua harus konsisten.

---

# 8.20 Monitoring Sistem

Halaman khusus:

**System Status**

Menampilkan:

- Status Spreadsheet
- Status Google Drive
- Status API
- Waktu Respons API
- Cache Status
- Jumlah Sheet
- Jumlah Folder
- Total Transaksi
- Kapasitas Penyimpanan Google Drive (jika tersedia)

---

# 8.21 Reliability

Target:

| Parameter           | Target      |
| ------------------- | ----------- |
| Ketersediaan Sistem | 99%+        |
| Kehilangan Data     | 0 transaksi |
| Kegagalan Upload    | <1%         |
| Error API           | <1%         |

---

# 8.22 Logging

Backend mencatat:

- Error
- Warning
- Login
- Export
- Upload
- Delete
- API Exception

Log memudahkan proses debugging.

---

# 8.23 Recovery

Jika upload gagal.

↓

File tidak disimpan.

↓

Transaksi dibatalkan.

Jika Spreadsheet gagal.

↓

Tidak ada data setengah tersimpan.

Semua proses harus bersifat atomik sebisa mungkin.

---

# 8.24 Scalability

Struktur aplikasi harus mendukung peningkatan:

Saat ini:

- 3 pengguna

Di masa depan:

- 100+ pengguna
- Puluhan ribu transaksi
- Banyak kategori
- Multi organisasi (opsional)

Tanpa perlu mengubah arsitektur frontend.

---

# 8.25 Maintainability

Kode harus:

- Modular
- Mudah dibaca
- Mudah diuji
- Mudah dikembangkan

Mengikuti struktur proyek yang konsisten.

---

# 8.26 Quality Assurance

Sebelum rilis, aplikasi harus melalui pengujian:

### Functional Testing

Semua fitur berjalan sesuai PRD.

---

### Responsive Testing

Android.

Tablet.

Laptop.

Desktop.

---

### Browser Testing

Chrome.

Edge.

Firefox.

Safari.

---

### Performance Testing

Login.

Dashboard.

Upload.

Export.

---

### User Acceptance Testing (UAT)

Dilakukan oleh:

- Ketua
- Sekretaris
- Bendahara

Seluruh alur utama harus disetujui sebelum aplikasi digunakan.

---

# 8.27 Deployment

Aplikasi siap dipasang pada:

Frontend

- Vercel
- Netlify
- Cloudflare Pages

Backend

- Google Apps Script

Database

- Google Spreadsheet

Storage

- Google Drive

Seluruh konfigurasi lingkungan (API URL, Spreadsheet ID, Folder Drive, dsb.) harus dipisahkan dari kode agar mudah dikelola.

---

# 8.28 Future Readiness

Arsitektur harus memungkinkan penambahan fitur berikut tanpa perubahan besar:

- Multi organisasi.
- Multi cabang.
- Persetujuan (Approval) laporan.
- Tanda tangan digital.
- Anggaran (Budget Planning).
- Dashboard AI untuk analisis pengeluaran.
- Integrasi WhatsApp atau Email untuk pengiriman laporan.
- Migrasi ke PostgreSQL atau MySQL.

---

# 8.29 Standar Produksi

Aplikasi dinyatakan **Production Ready** apabila:

- Semua Functional Requirement telah terpenuhi.
- Tidak ada bug kritis.
- Seluruh pengujian berhasil.
- Performa memenuhi target.
- Responsif di Android dan Desktop.
- Backup dan Restore telah diuji.
- Export PDF, Excel, CSV, dan Print berjalan dengan baik.
- Audit Log mencatat seluruh aktivitas penting.
- Dokumentasi pengembang dan pengguna telah tersedia.

---

# Penutup Bagian 8

Bagian ini menetapkan standar kualitas yang harus dipenuhi agar aplikasi tidak hanya berfungsi dengan baik, tetapi juga aman, cepat, stabil, dan nyaman digunakan dalam operasional sehari-hari. Dengan menerapkan praktik terbaik pada aspek keamanan, performa, responsivitas, dan kualitas perangkat lunak, sistem diharapkan mampu menjadi solusi pelaporan keuangan yang andal dan siap berkembang sesuai kebutuhan organisasi di masa mendatang.

# Product Requirements Document (PRD)

# Bagian 9 — Non-Functional Requirements (NFR)

---

# 9.1 Tujuan

Dokumen ini mendefinisikan seluruh kebutuhan non-fungsional yang harus dipenuhi agar aplikasi memiliki kualitas tinggi dari sisi keamanan, performa, kemudahan penggunaan, keandalan, skalabilitas, dan kemudahan pemeliharaan.

Berbeda dengan Functional Requirements yang menjelaskan **apa yang dilakukan sistem**, bagian ini menjelaskan **bagaimana sistem harus bekerja**.

---

# 9.2 Performance Requirements

Sistem harus memiliki waktu respon yang cepat pada seluruh fitur utama.

| Aktivitas        | Target Maksimum |
| ---------------- | --------------: |
| Login            |         2 detik |
| Dashboard        |         2 detik |
| Load Tabel       |         2 detik |
| Search           |          500 ms |
| Filter           |          500 ms |
| Tambah Transaksi |         3 detik |
| Edit Transaksi   |         3 detik |
| Hapus Transaksi  |         2 detik |
| Upload Bukti     |         5 detik |
| Export PDF       |        10 detik |
| Export Excel     |         5 detik |
| Export CSV       |         3 detik |
| Print Preview    |         3 detik |

Target diukur pada koneksi internet normal.

---

# 9.3 Availability

Target ketersediaan sistem.

| Parameter                | Target            |
| ------------------------ | ----------------- |
| Availability             | 99%               |
| Downtime Terencana       | <4 jam/bulan      |
| Downtime Tidak Terencana | Seminimal mungkin |

Jika Google Workspace mengalami gangguan, sistem harus memberikan informasi yang jelas kepada pengguna.

---

# 9.4 Reliability

Sistem harus tetap stabil selama digunakan.

Target:

- Tidak kehilangan data.
- Tidak menyimpan data ganda.
- Tidak terjadi kerusakan data.
- Semua transaksi selesai secara utuh (tidak setengah tersimpan).

---

# 9.5 Scalability

Versi pertama ditujukan untuk:

- 3 pengguna aktif.
- Ribuan transaksi per tahun.

Arsitektur harus siap dikembangkan hingga:

- 100+ pengguna.
- Ratusan ribu transaksi.
- Banyak organisasi.
- Banyak cabang.

Tanpa perlu mengubah struktur frontend.

---

# 9.6 Maintainability

Kode aplikasi harus:

- Modular.
- Mudah dipahami.
- Mudah diuji.
- Mudah diperbaiki.
- Mudah dikembangkan.

Target:

Pengembang baru mampu memahami struktur proyek dalam waktu kurang dari satu hari kerja.

---

# 9.7 Readability

Standar penamaan:

- Nama variabel jelas.
- Nama fungsi menggunakan kata kerja.
- Tidak menggunakan singkatan yang membingungkan.
- Struktur folder konsisten.

Semua kode menggunakan bahasa Inggris untuk penamaan teknis.

---

# 9.8 Security Requirements

Sistem wajib:

- Menggunakan HTTPS.
- Menyimpan password dalam bentuk hash.
- Memvalidasi seluruh input.
- Membatasi ukuran upload.
- Memvalidasi format file.
- Menyimpan Audit Log.

Tidak diperbolehkan:

- Menyimpan password dalam teks biasa.
- Menampilkan informasi sensitif kepada pengguna.
- Mengekspos Spreadsheet ID atau kredensial di frontend.

---

# 9.9 Data Integrity

Data harus selalu konsisten.

Contoh:

Volume

×

Harga

=

Total

Total tidak boleh diinput manual.

Selalu dihitung oleh sistem.

---

# 9.10 Auditability

Semua aktivitas penting harus dapat ditelusuri.

Minimal meliputi:

- Login
- Logout
- Tambah
- Edit
- Hapus
- Export
- Print
- Ubah Password
- Ubah Pengaturan

Audit Log tidak boleh dapat diedit melalui antarmuka aplikasi.

---

# 9.11 Usability

Target pengalaman pengguna:

- Pengguna baru dapat menggunakan aplikasi tanpa pelatihan.
- Menambah transaksi kurang dari 30 detik.
- Mencari transaksi kurang dari 5 detik.
- Membuat laporan kurang dari 1 menit.

---

# 9.12 Accessibility

Mengikuti praktik terbaik WCAG 2.1 Level AA untuk aspek-aspek utama.

Meliputi:

- Kontras warna memadai.
- Navigasi keyboard.
- Label pada seluruh input.
- Fokus keyboard terlihat.
- Ukuran font minimal 14 px.
- Ikon memiliki label atau tooltip.

---

# 9.13 Compatibility

Desktop:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

Android:

- Chrome
- Edge
- Firefox

Minimal mendukung dua versi terbaru masing-masing browser.

---

# 9.14 Responsive Requirement

Semua halaman harus mendukung:

- Android
- Tablet
- Laptop
- Desktop

Tidak boleh ada fitur yang hilang hanya karena ukuran layar berbeda.

---

# 9.15 Localization

Versi pertama menggunakan:

Bahasa Indonesia.

Arsitektur harus memungkinkan penambahan:

- English
- Bahasa Melayu

di masa depan.

---

# 9.16 Logging

Sistem harus menyimpan log:

- API Error
- Upload Error
- Login Error
- Export Error
- System Exception

Log digunakan untuk debugging dan pemantauan.

---

# 9.17 Backup

Backup dilakukan secara manual melalui aplikasi.

Jenis:

- Spreadsheet
- CSV
- Metadata
- Daftar Bukti Google Drive

Backup tidak mengganggu pengguna lain yang sedang menggunakan aplikasi.

---

# 9.18 Restore

Restore harus:

- Memvalidasi format file.
- Mendeteksi duplikasi.
- Memberikan konfirmasi sebelum impor.
- Menampilkan ringkasan hasil restore.

---

# 9.19 Monitoring

Sistem menyediakan halaman **System Status**.

Menampilkan:

- API Status
- Spreadsheet Status
- Google Drive Status
- Cache Status
- Waktu Respons
- Total Sheet
- Total Transaksi

---

# 9.20 Error Handling

Jika terjadi kesalahan.

Pengguna harus mendapatkan:

- Penjelasan sederhana.
- Langkah yang dapat dilakukan.
- Tombol Coba Lagi.

Tidak boleh menampilkan stack trace atau informasi teknis.

---

# 9.21 Session Management

Session pengguna:

- Berakhir otomatis setelah periode tidak aktif.
- Dapat diperpanjang melalui login kembali.
- Logout menghapus session aktif.

---

# 9.22 File Management

Semua file:

- Memiliki nama unik.
- Disimpan pada folder sesuai tahun dan bulan.
- Memiliki referensi ke transaksi.
- Tidak boleh ada file yatim (orphan file) jika memungkinkan.

---

# 9.23 API Quality

REST API harus:

- Konsisten.
- Menggunakan JSON.
- Memiliki struktur response yang sama.
- Mendukung pagination.
- Mendukung filtering.
- Mendukung sorting.

---

# 9.24 Code Quality

Frontend:

- ESLint
- Prettier
- Type Checking (jika menggunakan TypeScript)

Backend:

- Struktur modular.
- Validasi input.
- Pemisahan service.

---

# 9.25 Testing Requirements

Minimal pengujian meliputi:

### Unit Testing

- Utility.
- Validasi.

---

### Integration Testing

- Spreadsheet.
- Google Drive.
- API.

---

### Functional Testing

- Semua fitur utama.

---

### Responsive Testing

- Android.
- Tablet.
- Laptop.
- Desktop.

---

### User Acceptance Testing

Dilakukan oleh:

- Ketua
- Sekretaris
- Bendahara.

---

# 9.26 Deployment Requirements

Frontend:

- Vercel
- Netlify
- Cloudflare Pages

Backend:

- Google Apps Script

Database:

- Google Spreadsheet

Storage:

- Google Drive

Konfigurasi dipisahkan dari kode aplikasi.

---

# 9.27 Coding Standards

Seluruh kode mengikuti prinsip:

- SOLID.
- DRY.
- KISS.
- Separation of Concerns.

Struktur proyek harus konsisten.

---

# 9.28 Documentation Requirements

Dokumentasi minimal yang harus tersedia:

### Dokumentasi Pengguna

- Cara Login.
- Cara Input.
- Cara Export.
- Cara Print.

---

### Dokumentasi Administrator

- Konfigurasi.
- Backup.
- Restore.
- Pengaturan.

---

### Dokumentasi Pengembang

- Struktur API.
- Struktur Spreadsheet.
- Struktur Folder.
- Cara Deploy.
- Cara Menambah Fitur.

---

# 9.29 Future Requirements

Arsitektur harus mendukung penambahan:

- Multi organisasi.
- Multi cabang.
- Budget Planning.
- Approval Workflow.
- Digital Signature.
- Email Notification.
- WhatsApp Notification.
- AI Analytics.
- Migrasi ke PostgreSQL atau MySQL.
- Progressive Web App (PWA) untuk pengalaman seperti aplikasi native.

---

# 9.30 Definition of Done (DoD)

Fitur dinyatakan selesai apabila:

- Seluruh Functional Requirement telah terpenuhi.
- Seluruh Non-Functional Requirement telah terpenuhi.
- Tidak ada bug kritis.
- Lulus Functional Testing.
- Lulus Responsive Testing.
- Lulus User Acceptance Testing.
- Dokumentasi telah diperbarui.
- Kode telah melalui proses review.
- Siap digunakan oleh Ketua, Sekretaris, dan Bendahara.

---

# 9.31 Risiko dan Mitigasi

| Risiko                            | Dampak                      | Mitigasi                                                            |
| --------------------------------- | --------------------------- | ------------------------------------------------------------------- |
| Google Apps Script mencapai kuota | API melambat atau gagal     | Optimalkan cache, batasi request, pantau penggunaan kuota           |
| Google Spreadsheet semakin besar  | Performa menurun            | Gunakan 1 bulan = 1 sheet, pagination, dan query berdasarkan filter |
| Google Drive penuh                | Upload gagal                | Monitoring kapasitas dan pemberitahuan dini kepada pengguna         |
| Koneksi internet lambat           | Pengalaman pengguna menurun | Optimalkan ukuran gambar, lazy loading, dan caching                 |
| Kesalahan input pengguna          | Data tidak akurat           | Validasi form, konfirmasi aksi penting, dan Audit Log               |

---

# Penutup Bagian 9

Bagian ini menjadi standar kualitas aplikasi dari sisi non-fungsional. Dengan memenuhi seluruh persyaratan pada dokumen ini, aplikasi diharapkan tidak hanya memenuhi kebutuhan bisnis, tetapi juga memiliki kualitas teknis yang tinggi, mudah dipelihara, aman, responsif, dan siap digunakan sebagai sistem pelaporan keuangan organisasi dalam jangka panjang.

# Product Requirements Document (PRD)

# Bagian 10 — User Flow, Wireframe, Roadmap & Future Development

---

# 10.1 Tujuan

Bagian ini menjelaskan bagaimana pengguna berinteraksi dengan aplikasi dari awal hingga akhir, struktur navigasi aplikasi, roadmap pengembangan, serta arah pengembangan jangka panjang.

Dokumen ini menjadi acuan bagi tim desain UI/UX, frontend, backend, dan penguji agar seluruh alur aplikasi konsisten dan mudah digunakan.

---

# 10.2 User Journey

## Login

```text
Membuka Website

↓

Login

↓

Dashboard
```

---

## Menambah Transaksi

```text
Dashboard

↓

Klik Tambah

↓

Isi Form

↓

Upload Bukti

↓

Simpan

↓

Dashboard Update

↓

Transaksi Masuk
```

---

## Mengedit Transaksi

```text
Dashboard

↓

Daftar Transaksi

↓

Klik Detail

↓

Edit

↓

Simpan

↓

Dashboard Update
```

---

## Menghapus Transaksi

```text
Daftar Transaksi

↓

Pilih Data

↓

Konfirmasi

↓

Hapus

↓

Audit Log

↓

Dashboard Update
```

---

## Membuat Laporan

```text
Dashboard

↓

Pilih Bulan

↓

Filter

↓

Preview

↓

Export PDF / Excel / CSV

↓

Download
```

---

# 10.3 Sitemap

```text
Login
│
├── Dashboard
│
├── Transaksi
│     ├── Semua Transaksi
│     ├── Tambah
│     ├── Detail
│     └── Edit
│
├── Laporan
│     ├── Bulanan
│     ├── Tahunan
│     ├── Per Kategori
│     ├── Per Pengguna
│     └── Tanpa Nota
│
├── Dashboard Analytics
│
├── Export
│
├── Pengaturan
│     ├── Profil
│     ├── Pengguna
│     ├── Kategori
│     ├── Sistem
│     └── Password
│
└── Audit Log
```

---

# 10.4 Struktur Navigasi

## Desktop

Sidebar kiri.

- Dashboard
- Transaksi
- Laporan
- Analytics
- Export
- Pengaturan
- Audit Log

Header atas.

- Search
- Notifikasi
- Dark Mode
- Profil

---

## Android

Bottom Navigation.

- Dashboard
- Transaksi
- Tambah
- Laporan
- Pengaturan

FAB digunakan untuk menambah transaksi dengan cepat.

---

# 10.5 Wireframe Dashboard

```text
┌──────────────────────────────────────────────┐
│ Header                                       │
├──────────────────────────────────────────────┤
│ KPI │ KPI │ KPI │ KPI                        │
├──────────────────────────────────────────────┤
│ Line Chart                                  │
├─────────────────────┬────────────────────────┤
│ Bar Chart           │ Pie Chart             │
├─────────────────────┴────────────────────────┤
│ Aktivitas Terbaru                           │
├──────────────────────────────────────────────┤
│ Tabel Transaksi                             │
└──────────────────────────────────────────────┘
```

---

# 10.6 Wireframe Input Transaksi

```text
Tanggal

Kategori

Uraian

Volume

Harga Satuan

Total (Otomatis)

Nomor Nota

Upload Bukti

Preview

Simpan
```

Jika kategori:

- Transport
- Insentif & Bisyaroh
- Lain-lain

↓

Nomor Nota dan Upload Bukti menjadi opsional.

---

# 10.7 Wireframe Detail Transaksi

Desktop:

Drawer dari kanan.

Android:

Bottom Sheet Fullscreen.

Menampilkan:

- Foto Nota
- Informasi Transaksi
- Riwayat Edit
- Tombol Edit
- Tombol Print

---

# 10.8 Wireframe Laporan

```text
Filter

↓

Ringkasan

↓

Grafik

↓

Tabel

↓

Export

↓

Print
```

---

# 10.9 User Flow Diagram

```text
Login
   │
   ▼
Dashboard
   │
   ├──────────────┐
   │              │
Tambah       Laporan
   │              │
   ▼              ▼
Upload        Filter
   │              │
   ▼              ▼
Spreadsheet   Export
   │
   ▼
Dashboard Update
```

---

# 10.10 Roadmap Pengembangan

## Versi 1.0

Target:

- Login
- Dashboard
- CRUD Transaksi
- Upload Google Drive
- Google Spreadsheet
- Export PDF
- Export Excel
- Export CSV
- Print
- Responsive
- Dark Mode
- Audit Log

---

## Versi 1.1

Penambahan:

- Dashboard lebih interaktif
- Calendar View
- Riwayat Upload
- Import Excel
- Backup
- Restore
- Optimasi Dashboard

---

## Versi 1.2

Penambahan:

- Approval Laporan
- Kunci Bulan
- Digital Signature
- QR Verification
- Email Report
- WhatsApp Report

---

## Versi 2.0

Penambahan:

- Budget Planning
- Forecast Pengeluaran
- Dashboard AI
- Multi Organisasi
- Multi Cabang
- Multi Role
- Progressive Web App (PWA)

---

# 10.11 Future Development

Aplikasi dirancang agar mudah dikembangkan.

Fitur yang dapat ditambahkan.

### Artificial Intelligence

- Prediksi pengeluaran.
- Ringkasan otomatis.
- Analisis kategori.

---

### Notification

- WhatsApp.
- Email.
- Push Notification.

---

### Integrasi

- Google Calendar.
- Google Meet.
- Google Workspace.
- Sistem Akuntansi.

---

### Mobile App

- Android.
- iOS.

Menggunakan API yang sama.

---

### Cloud Database

Migrasi ke:

- PostgreSQL.
- MySQL.
- Supabase.

Tanpa mengubah frontend.

---

# 10.12 Success Metrics

Keberhasilan aplikasi diukur menggunakan indikator berikut.

| Indikator         | Target    |
| ----------------- | --------- |
| Waktu Input       | <30 detik |
| Login             | <2 detik  |
| Dashboard         | <2 detik  |
| Search            | <500 ms   |
| Error Rate        | <1%       |
| Upload Berhasil   | >99%      |
| Export Berhasil   | >99%      |
| Kepuasan Pengguna | >90%      |

---

# 10.13 Risiko Pengembangan

| Risiko                         | Mitigasi                                                               |
| ------------------------------ | ---------------------------------------------------------------------- |
| Kuota Google Apps Script habis | Optimasi cache, batching, dan monitoring kuota                         |
| Ukuran Spreadsheet bertambah   | 1 bulan = 1 sheet, query berdasarkan filter, pagination                |
| Kapasitas Google Drive penuh   | Monitoring kapasitas dan pengingat kepada admin                        |
| Koneksi internet lambat        | Kompresi gambar, lazy loading, retry upload                            |
| Perubahan struktur Spreadsheet | Gunakan sheet Template dan validasi struktur sebelum proses baca/tulis |

---

# 10.14 Milestone Proyek

| Tahap                      | Estimasi   |
| -------------------------- | ---------- |
| Perancangan UI/UX          | 1 Minggu   |
| Frontend React             | 2–3 Minggu |
| Backend Google Apps Script | 1–2 Minggu |
| Integrasi API              | 1 Minggu   |
| Pengujian Internal         | 1 Minggu   |
| User Acceptance Test (UAT) | 1 Minggu   |
| Deployment Production      | 2 Hari     |

Estimasi total pengembangan: **7–9 minggu**, tergantung jumlah pengembang dan perubahan ruang lingkup.

---

# 10.15 Kriteria Keberhasilan Proyek

Proyek dianggap berhasil apabila:

- Semua fitur pada PRD telah diimplementasikan.
- Dashboard berfungsi dengan baik pada Android dan Desktop.
- Google Spreadsheet menjadi sumber data utama tanpa kendala operasional.
- Google Drive berhasil menyimpan seluruh bukti transaksi.
- Export PDF, Excel, CSV, dan Print menghasilkan dokumen yang rapi.
- Laporan bulanan dapat dibuat tanpa proses manual.
- Semua transaksi tercatat dalam Audit Log.
- Pengguna dapat menyelesaikan pekerjaan harian dengan cepat dan mudah.

---

# 10.16 Kesimpulan

Sistem Pelaporan Keuangan Bulanan dirancang sebagai aplikasi web modern yang menggabungkan **React + Vite**, **Google Apps Script**, **Google Spreadsheet**, dan **Google Drive** untuk menghasilkan solusi pelaporan keuangan yang sederhana, cepat, aman, dan mudah dipelihara.

Pendekatan **1 bulan = 1 sheet**, penyimpanan bukti transaksi di Google Drive, dashboard analitik interaktif, export laporan profesional, serta desain **mobile-first** memastikan aplikasi dapat digunakan secara nyaman baik melalui perangkat Android maupun desktop.

Arsitektur modular yang digunakan juga memungkinkan pengembangan bertahap tanpa perlu mengubah fondasi sistem, sehingga aplikasi siap berkembang menjadi platform manajemen keuangan yang lebih lengkap di masa mendatang.

---

# Lampiran A — Stack Teknologi

## Frontend

- React 19+
- Vite
- Tailwind CSS
- Axios
- TanStack Query
- TanStack Table
- React Router
- React Hook Form
- Zod
- Recharts
- Framer Motion
- React Hot Toast
- Lucide React

## Backend

- Google Apps Script
- REST API

## Database

- Google Spreadsheet

## Storage

- Google Drive

---

# Lampiran B — Struktur Folder Frontend

```text
src/
├── assets/
├── components/
├── layouts/
├── pages/
├── routes/
├── hooks/
├── services/
├── store/
├── utils/
├── types/
├── constants/
├── styles/
└── App.jsx
```

---

# Lampiran C — Struktur Backend

```text
backend/
├── api/
├── services/
├── repositories/
├── validators/
├── middleware/
├── helpers/
├── config/
├── models/
└── app.gs
```

---

# Penutup Dokumen PRD

Dokumen PRD ini menjadi acuan utama dalam proses analisis, desain, implementasi, pengujian, hingga pemeliharaan aplikasi. Setiap perubahan kebutuhan di masa depan sebaiknya dilakukan melalui revisi PRD agar pengembangan tetap terarah, terdokumentasi, dan mudah dikelola. Dengan fondasi ini, proyek memiliki spesifikasi yang jelas dan siap dilanjutkan ke tahap **Software Design Specification (SDS)** dan implementasi.
