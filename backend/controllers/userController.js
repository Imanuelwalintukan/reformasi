// controllers/userController.js
const { createClient } = require('@supabase/supabase-js');

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );
    
    const { data, error } = await supabase
      .from('profiles') // pastikan kamu membuat table ini di Supabase
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    );
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Profile updated successfully',
      data
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};