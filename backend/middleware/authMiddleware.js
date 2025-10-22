// middleware/authMiddleware.js
const { createClient } = require('@supabase/supabase-js');

const requireAuth = async (req, res, next) => {
  try {
    // Ambil token dari header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );

    // Verifikasi token dengan Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Authentication error:', error);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Tambahkan user info ke request object
    req.user = data.user;
    
    next();
  } catch (error) {
    console.error('Server error in auth middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { requireAuth };