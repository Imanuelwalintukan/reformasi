// controllers/authController.js
const { createClient } = require('@supabase/supabase-js');

const register = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    // Validasi input
    if (!email || !password || !full_name) {
      return res.status(400).json({ error: 'Email, password, dan full_name wajib diisi' });
    }

    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );

    // Register user menggunakan Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name
        }
      }
    });

    if (error) {
      console.error('Error registering user:', error);
      return res.status(400).json({ error: error.message });
    }

    // Kembalikan data user (tanpa password)
    const { password: _, ...userWithoutPassword } = data.user;
    
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Server error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi' });
    }

    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );

    // Login user menggunakan Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error logging in user:', error);
      return res.status(400).json({ error: error.message });
    }

    // Kembalikan session data
    res.json({
      message: 'Login successful',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    console.error('Server error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  try {
    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out user:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Server error during logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting user:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({ user });
  } catch (error) {
    console.error('Server error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser
};