# Reformasi Web Backend

Backend untuk aplikasi e-commerce reformasi web menggunakan Express.js dan Supabase.

## Instalasi

1. Pastikan Node.js sudah terinstall di sistem Anda
2. Install dependensi:
```bash
npm install
```

3. Buat file `.env` berdasarkan `.env.example` dan isi dengan konfigurasi Supabase Anda

4. Jalankan server:
```bash
npm run dev  # untuk development
npm start    # untuk production
```

## Struktur Folder
- `controllers/` - Logika bisnis
- `routes/` - Definisi endpoint API
- `middleware/` - Middleware Express
- `models/` - Schema database
- `config/` - Konfigurasi tambahan
- `utils/` - Utilitas umum

## Endpoint API
### Auth
- `POST /api/auth/register` - Registrasi user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Dapatkan informasi user yang sedang login

### Produk (Public)
- `GET /api/products` - Dapatkan semua produk
- `GET /api/products/:id` - Dapatkan produk berdasarkan ID

### Produk (Memerlukan Auth)
- `POST /api/products` - Buat produk baru
- `PUT /api/products/:id` - Update produk
- `DELETE /api/products/:id` - Hapus produk

### User
- `GET /api/users/:id` - Dapatkan profile user
- `PUT /api/users/:id` - Update profile user

## Catatan
Backend ini menggunakan otentikasi bawaan Supabase, sehingga tidak perlu implementasi JWT manual.