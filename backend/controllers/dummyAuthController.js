// controllers/dummyAuthController.js
// Dummy login implementation

const dummyLogin = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    // Validasi input
    if (!email) {
      return res.status(400).json({ error: 'Email wajib diisi' });
    }

    // Untuk login dummy, kita tidak melakukan validasi password nyata
    // Kita hanya membuat data user dummy
    const dummyUser = {
      id: `dummy_${Date.now()}`, // ID unik sementara
      email: email,
      full_name: full_name || email.split('@')[0], // Gunakan nama dari email jika tidak disediakan
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_metadata: {
        full_name: full_name || email.split('@')[0],
        provider: 'dummy'
      }
    };

    res.json({
      message: 'Login dummy successful',
      user: dummyUser,
    });
  } catch (error) {
    console.error('Server error in dummy login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { dummyLogin };