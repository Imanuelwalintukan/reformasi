# Panduan Menggunakan Ngrok untuk Midtrans Webhook

## Apa itu Ngrok?
Ngrok adalah layanan yang membuat tunnel dari internet publik ke localhost Anda, memungkinkan layanan eksternal (seperti Midtrans) untuk mengakses server yang berjalan di komputer lokal Anda.

## Langkah 1: Instalasi Ngrok

### Pilihan 1: Instalasi Melalui npm (jika Anda sudah menginstal Node.js)
```bash
npm install -g ngrok
```

### Pilihan 2: Unduh Langsung dari Website Ngrok
1. Kunjungi https://ngrok.com/download
2. Pilih sistem operasi Anda (Windows, macOS, atau Linux)
3. Unduh file instalasi
4. Ekstrak dan letakkan ngrok.exe di folder yang mudah diakses, atau tambahkan ke PATH sistem

## Langkah 2: Login ke Akun Ngrok (Opsional tapi Disarankan)

1. Buat akun gratis di https://ngrok.com/
2. Dapatkan authtoken dari https://dashboard.ngrok.com/get-started/your-authtoken
3. Setelah mendapatkan token, jalankan:
```bash
ngrok config add-authtoken [your-authtoken-here]
```

## Langkah 3: Menjalankan Server Backend

Pastikan server backend Anda berjalan di port 5001:
```bash
cd C:\kuliah\reformasi2025\backend
npm run dev
```

Pastikan Anda melihat pesan bahwa server berjalan di `http://localhost:5001`

## Langkah 4: Menjalankan Ngrok

Buka Command Prompt atau PowerShell baru (jangan tutup server Anda), lalu jalankan:
```bash
ngrok http 5001
```

## Langkah 5: Mendapatkan URL Publik

Setelah menjalankan perintah di atas, Anda akan melihat output seperti:
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Forwarding                    https://abc1234.ngrok.io -> http://localhost:5001
Forwarding                    http://abc1234.ngrok.io -> http://localhost:5001

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

URL yang Anda perlukan adalah `https://abc1234.ngrok.io` (URL akan berbeda setiap kali Anda menjalankan ngrok).

## Langkah 6: Konfigurasi Webhook Midtrans

1. Kunjungi dashboard sandbox Midtrans Anda di https://dashboard.sandbox.midtrans.com/
2. Masuk ke akun sandbox Anda
3. Pilih menu "Settings" → "Configuration"
4. Di bagian "Notification URL", masukkan:
   ```
   https://abc1234.ngrok.io/api/midtrans/notification
   ```
   (Ganti abc1234.ngrok.io dengan URL dari ngrok Anda)
5. Simpan konfigurasi

## Langkah 7: Melakukan Testing

1. Lakukan proses pembayaran di aplikasi frontend Anda
2. Setelah pembayaran selesai, Midtrans akan mengirimkan notifikasi ke URL webhook Anda
3. Server Anda akan menerima notifikasi dan memperbarui status pembayaran di database
4. Anda bisa melihat log permintaan masuk di jendela ngrok

## Tips dan Trik

### 1. Menyimpan URL Ngrok
Karena URL ngrok berubah setiap kali Anda menjalankannya, Anda bisa:
- Mencatatnya setiap kali membuat tunnel baru
- Atau menggunakan subdomain khusus (membutuhkan akun pro)

### 2. Menjalankan Ngrok dengan Subdomain Tetap (Opsional)
Jika Anda memiliki akun pro, Anda bisa membuat subdomain tetap:
```bash
ngrok http 5001 --subdomain=your-subdomain
```

### 3. Menggunakan Ngrok untuk Port Lain
Jika Anda menjalankan frontend di port berbeda (misalnya 3000), Anda juga bisa membuat tunnel untuk frontend:
```bash
ngrok http 3000
```

### 4. Cek Request di Ngrok Dashboard
Ngrok menyediakan dashboard lokal untuk melihat request yang masuk:
- Buka browser dan kunjungi `http://127.0.0.1:4040`
- Di sini Anda bisa melihat semua request yang masuk ke tunnel Anda

### 5. Stop Ngrok
Untuk menghentikan ngrok, cukup tekan `Ctrl + C` di terminal tempat ngrok berjalan.

## Troubleshooting Umum

### 1. URL Ngrok Berubah
- Ini normal, setiap kali Anda menjalankan ngrok, URL akan berubah
- Pastikan untuk selalu memperbarui webhook URL di dashboard Midtrans

### 2. Tidak Bisa Akses URL Ngrok
- Pastikan server backend Anda benar-benar berjalan
- Cek apakah ada firewall yang memblokir koneksi

### 3. Webhook Tidak Bekerja
- Pastikan Anda menggunakan URL dengan HTTPS di dashboard Midtrans
- Cek kembali endpoint yang digunakan: `/api/midtrans/notification`

### 4. Koneksi Terputus
- Tunnel ngrok akan aktif selama terminal berjalan
- Jika terputus, cukup jalankan ulang perintah `ngrok http 5001`

## Kelebihan Menggunakan Ngrok

1. **Mudah Digunakan**: Hanya perlu satu perintah untuk membuat tunnel
2. **Gratis**: Versi dasar ngrok gratis untuk penggunaan pribadi
3. **Inspeksi Request**: Anda bisa melihat semua request yang masuk
4. **HTTPS Otomatis**: Ngrok menyediakan HTTPS bahkan untuk server HTTP lokal

## Alternatif Lain

Selain ngrok, Anda juga bisa menggunakan alternatif berikut:
- **Cloudflare Tunnel** (sebelumnya bernama Argo Tunnel)
- **LocalTunnel**
- **Serveo**

Tapi ngrok tetap yang paling populer dan mudah digunakan.

## Kesimpulan

Dengan ngrok, Anda bisa:
- Menguji webhook Midtrans secara penuh
- Melihat request yang dikirim dari Midtrans
- Men-debug masalah webhook
- Menghindari penggunaan endpoint debug (meskipun endpoint debug tetap berguna untuk testing manual)

Ngrok sangat berguna bagi developer yang ingin menguji integrasi pembayaran secara lengkap sebelum deployment ke production.