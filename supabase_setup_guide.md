# Skema Database Supabase untuk E-Commerce POT & GERABAH

## Tabel-tabel yang telah dibuat:

### 1. user_profiles
- Menyimpan informasi profil pengguna tambahan
- Terhubung ke sistem autentikasi Supabase

### 2. products
- Menyimpan informasi produk
- Termasuk harga, deskripsi, stok, dll

### 3. orders
- Menyimpan informasi pembelian dari Midtrans
- Termasuk status pembayaran, metode pembayaran, dll
- Terintegrasi dengan notifikasi Midtrans

### 4. order_items
- Menyimpan detail item dalam setiap order
- Untuk struktur yang lebih rinci

### 5. user_cart
- Menyimpan keranjang belanja pengguna
- Ditautkan ke akun pengguna

## Fitur-fitur yang didukung:

### Integrasi Midtrans:
- Penyimpanan data pembayaran ke Supabase
- Penyimpanan status pembayaran
- Penanganan berbagai status pembayaran (pending, settlement, cancel, dll)

### Sistem Autentikasi:
- Terintegrasi dengan Supabase Auth
- Profil pengguna tambahan di tabel user_profiles

### Sistem Produk:
- Manajemen produk lengkap
- Stok tersedia
- Kategori produk

## Cara Menggunakan Skema:

1. Login ke dashboard Supabase
2. Pilih proyek Anda
3. Pergi ke menu Database > SQL Editor
4. Salin dan paste skema SQL dari file supabase_schema.sql
5. Jalankan query untuk membuat tabel-tabel

File `supabase_schema.sql` siap disalin dan digunakan di dashboard Supabase Anda.