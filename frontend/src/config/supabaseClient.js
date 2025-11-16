import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Tambahkan konfigurasi untuk mengelola sesi
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Refresh token secara otomatis sebelum kadaluarsa
    autoRefreshToken: true,
    // Simpan sesi di localStorage agar tetap login setelah refresh
    persistSession: true,
    // Durasi sesi dalam detik (jika tidak diatur, gunakan default)
    detectSessionInUrl: true
  }
});

export { supabase };