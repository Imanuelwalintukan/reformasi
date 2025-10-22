import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL atau ANON key tidak ditemukan di environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);