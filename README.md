# POT & GERABAH - E-Commerce Website

Website e-commerce untuk menjual pot dan gerabah buatan tangan dengan sistem login/signup dan otentikasi Google.

## Fitur Utama

- 🔐 Sistem otentikasi lengkap (login, signup, logout)
- 📧 Login dengan email/password
- 🅖 Login dengan Google
- 👤 Manajemen profil pengguna
- 🛒 Halaman produk
- 🛍️ Keranjang belanja
- 📞 Kontak
- 📖 Tentang kami
- 🔐 Proteksi akses halaman (pengguna harus login/signup terlebih dahulu sebelum bisa belanja)

## Teknologi yang Digunakan

### Frontend
- React.js
- React Router DOM
- Supabase Client Library
- Google OAuth
- CSS3

### Backend
- Node.js
- Express.js
- Supabase (sebagai database dan auth provider)

## Prasyarat

Sebelum kamu mulai, pastikan kamu sudah menginstal:

- Node.js (versi 14 atau lebih baru)
- npm atau yarn
- Git

## Instalasi

1. Clone repositori ini:
```bash
git clone <URL_REPOSITORY_KAMU>
cd reformasi_web
```

2. Instal dependensi frontend:
```bash
cd frontend
npm install
```

3. Instal dependensi backend:
```bash
cd ../backend
npm install
```

4. Kembali ke root proyek:
```bash
cd ..
```

## Konfigurasi

### Frontend

1. Di direktori `frontend`, buat file `.env`:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend

1. Di direktori `backend`, buat file `.env`:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=5000
```

## Menjalankan Aplikasi

### Menjalankan Frontend

1. Pastikan kamu berada di direktori `frontend`
2. Jalankan perintah:
```bash
npm start
```
Aplikasi akan berjalan di `http://localhost:3000`

### Menjalankan Backend

1. Buka terminal baru dan pastikan kamu berada di direktori `backend`
2. Jalankan perintah:
```bash
npm run dev
```
Server akan berjalan di `http://localhost:5000`

## Struktur Proyek

```
reformasi_web/
├── frontend/                 # Kode frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/       # Komponen React
│   │   ├── pages/            # Halaman utama
│   │   ├── config/           # Konfigurasi (Supabase)
│   │   └── ...
│   └── ...
├── backend/                  # Kode backend Express
│   ├── controllers/          # Logika bisnis
│   ├── routes/               # Rute API
│   ├── middleware/           # Middleware
│   └── ...
├── .gitignore
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Registrasi pengguna baru
- `POST /api/auth/login` - Login pengguna
- `POST /api/auth/logout` - Logout pengguna
- `POST /api/auth/google` - Login dengan Google
- `GET /api/auth/user` - Dapatkan informasi pengguna

### Produk
- `GET /api/products` - Dapatkan semua produk (publik)
- `GET /api/products/:id` - Dapatkan produk berdasarkan ID (publik)
- `POST /api/products` - Tambah produk baru (memerlukan auth)
- `PUT /api/products/:id` - Update produk (memerlukan auth)
- `DELETE /api/products/:id` - Hapus produk (memerlukan auth)

### User
- `GET /api/users/:id` - Dapatkan profil pengguna
- `PUT /api/users/:id` - Update profil pengguna

## Fitur Otentikasi

Aplikasi ini menyediakan beberapa metode otentikasi:

1. **Email/Password** - Registrasi dan login standar
2. **Google OAuth** - Login menggunakan akun Google

### Perlindungan Akses

- Halaman produk hanya bisa diakses oleh pengguna yang sudah login
- Jika pengguna belum login dan ingin mengakses halaman produk, mereka akan diarahkan ke halaman signup
- Tombol "Shop Now" di halaman utama akan mengarahkan ke signup jika pengguna belum login

## Kontribusi

Kontribusi sangat diterima! Silakan buat pull request dengan perbaikan atau fitur baru.

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detailnya.

## Pengembang

Dikembangkan sebagai bagian dari proyek kuliah.

## Pembaruan Harga Produk

Kami telah menyesuaikan harga semua produk kami agar lebih terjangkau dan kompetitif. Harga produk sekarang dalam kisaran $1.99 - $6.00, semua di bawah $6.67 (Rp 100.000). Produk yang tersedia:
- Small Ceramic Pot: $2.50
- Medium Plant Pot: $3.75
- Vintage Mini Pot: $4.20
- Tiny White Pot: $1.99
- Medium Bohemian Pot: $5.50
- Large Decorative Pot: $6.00

## Fitur Konversi Rupiah

Semua harga yang ditampilkan sudah dikonversi ke Rupiah Indonesia (IDR) dengan kurs tukar $1 = Rp 15.000. Harga produk dalam rupiah:
- Small Ceramic Pot: Rp 37.500
- Medium Plant Pot: Rp 56.250
- Vintage Mini Pot: Rp 63.000
- Tiny White Pot: Rp 29.850
- Medium Bohemian Pot: Rp 82.500
- Large Decorative Pot: Rp 90.000

## Filter Harga

Aplikasi ini menyediakan fitur filter harga di halaman produk utama yang memungkinkan pengguna untuk menyaring produk berdasarkan rentang harga dan mengurutkannya sesuai kebutuhan.

## Fitur Checkout

Aplikasi ini menyediakan proses checkout yang lengkap di halaman keranjang belanja. Fitur-fitur checkout meliputi:

- Formulir pengisian data pelanggan (nama, email, nomor telepon, alamat)
- Pilihan metode pembayaran (Cash on Delivery, Transfer Bank, Kartu Kredit)
- Ringkasan pesanan yang jelas (tanpa biaya pengiriman)
- Validasi data sebelum proses checkout
- Konfirmasi pesanan setelah checkout berhasil
- Integrasi dengan sistem otentikasi - hanya pengguna yang login yang dapat melakukan checkout

## Fitur Keranjang Belanja

Aplikasi ini memiliki sistem keranjang belanja yang lengkap dengan fitur-fitur:

- Menambahkan produk ke keranjang dari halaman produk
- Menampilkan jumlah item di ikon keranjang di header
- Mengelola kuantitas produk di keranjang (tambah/kurangi)
- Menghapus produk dari keranjang
- Penyimpanan data keranjang ke localStorage untuk persistensi
- Fungsi total harga otomatis berdasarkan kuantitas produk
- Integrasi dengan sistem checkout untuk proses pembelian

## Fitur Pembayaran Midtrans

Aplikasi ini menyediakan integrasi dengan payment gateway Midtrans yang mencakup:

- Berbagai pilihan metode pembayaran (GoPay, OVO, ShopeePay, DANA, Kartu Kredit, Virtual Account)
- Simulasi proses pembayaran yang realistis
- Penanganan status pembayaran (sukses, gagal)
- Integrasi dengan sistem checkout untuk pengalaman pembayaran yang lancar
- Tampilan pembayaran yang responsif dan menarik
- Konfigurasi dengan key Midtrans Sandbox
- Endpoint backend untuk pembuatan transaksi Midtrans
- Penanganan notifikasi pembayaran (webhook) dari Midtrans

## Desain Latar Belakang Transparan

Bagian hero utama ("Welcome to POT & GERABAH") telah diperbarui dengan latar belakang transparan untuk memberikan tampilan yang lebih modern dan memungkinkan integrasi yang lebih baik dengan desain keseluruhan situs. Warna teks juga telah disesuaikan untuk memastikan keterbacaan yang optimal.

## Footer "direct by 2025"

Footer situs telah diperbarui dengan penambahan teks "direct by 2025" untuk menunjukkan tahun dan identitas proyek. Teks ini dirancang dengan gaya yang elegan dan tidak mencolok namun tetap memberikan informasi penting tentang asal-usul proyek.