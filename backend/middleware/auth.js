const { createClient } = require('@supabase/supabase-js');

// Inisialisasi Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Hanya throw error jika variabel lingkungan diperlukan untuk fungsi tertentu
const supabase = supabaseUrl && supabaseServiceRoleKey 
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

// Middleware untuk memverifikasi token Supabase
const requireAuth = async (req, res, next) => {
  try {
    // Cek apakah supabase client tersedia
    if (!supabase) {
      console.warn('Supabase client not configured, skipping auth middleware');
      // Jika tidak ada konfigurasi Supabase, lewati middleware
      req.user = null;
      return next();
    }

    // Ambil token dari header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Untuk keperluan development, bisa mengizinkan tanpa token
      req.user = null;
      return next();
    }
    
    const token = authHeader.substring(7);
    
    // Verifikasi token dengan Supabase
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) {
      console.error('Auth error:', error);
      req.user = null;
      return next(); // Hanya log error, jangan hentikan request
    }
    
    // Tambahkan user ke request object
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    req.user = null;
    next(); // Jangan hentikan request karena error auth
  }
};

module.exports = {
  requireAuth,
  supabase
};