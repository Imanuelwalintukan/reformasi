// controllers/googleAuthController.js
const { createClient } = require('@supabase/supabase-js');

const googleLogin = async (req, res) => {
  try {
    const { email, full_name, google_id, picture } = req.body;

    // Validasi input
    if (!email || !full_name) {
      return res.status(400).json({ error: 'Email dan full name wajib diisi' });
    }

    // Buat instance supabase client di dalam fungsi
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Cek apakah user sudah ada di auth
    let { data: existingUser, error: queryError } = await supabase
      .from('users') // asumsikan tabel users ada di database
      .select('*')
      .eq('email', email)
      .single();

    let userId;

    if (queryError) {
      // User belum ada, buat user baru di auth
      const { data, error: authError } = await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true, // Langsung konfirmasi email karena dari Google
        user_metadata: {
          full_name: full_name,
          google_id: google_id,
          picture: picture,
          provider: 'google'
        }
      });

      if (authError) {
        console.error('Error creating user in auth:', authError);
        return res.status(400).json({ error: authError.message });
      }

      userId = data.user.id;

      // Buat baris di tabel users untuk menyimpan data tambahan
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: email,
          full_name: full_name,
          google_id: google_id
        });

      if (insertError) {
        console.error('Error inserting user to users table:', insertError);
        return res.status(400).json({ error: insertError.message });
      }
    } else {
      // User sudah ada, update data
      userId = existingUser.id;

      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: full_name,
          google_id: google_id,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Error updating user in users table:', updateError);
        return res.status(400).json({ error: updateError.message });
      }

      // Update metadata di auth
      const { error: authUpdateError } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          full_name: full_name,
          google_id: google_id,
          picture: picture,
          provider: 'google'
        }
      });

      if (authUpdateError) {
        console.error('Error updating user metadata:', authUpdateError);
        return res.status(400).json({ error: authUpdateError.message });
      }
    }

    // Ambil user terbaru
    const { data: userData, error: fetchError } = await supabase.auth.admin.getUserById(userId);

    if (fetchError) {
      console.error('Error fetching user data:', fetchError);
      return res.status(400).json({ error: fetchError.message });
    }

    res.json({
      message: 'Login/Registration with Google successful',
      user: userData.user,
    });
  } catch (error) {
    console.error('Server error in Google login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { googleLogin };