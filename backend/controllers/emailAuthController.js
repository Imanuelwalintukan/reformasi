// controllers/emailAuthController.js
// Simple in-memory storage for users (for development/testing)
const users = new Map();
const sessions = new Map(); // Store active sessions

// Generate a random session token
function generateSessionToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const emailLogin = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: 'Email wajib diisi' });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format email tidak valid' });
    }

    // Check if user exists, if not create a new one
    let user = users.get(email);
    if (!user) {
      user = {
        id: Date.now().toString(), // Simple ID generation
        email: email,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      };
      users.set(email, user);
    } else {
      // Update last login time
      user.last_login = new Date().toISOString();
      users.set(email, user);
    }

    // Generate a session token
    const sessionToken = generateSessionToken();
    
    // Store the session
    const sessionData = {
      user: user,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    
    sessions.set(sessionToken, sessionData);

    // Return user data and session token
    res.json({
      message: 'Login berhasil',
      user: user,
      session_token: sessionToken
    });
  } catch (error) {
    console.error('Server error during email login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserFromSession = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const sessionToken = authHeader.substring(7); // Remove 'Bearer ' prefix
    const sessionData = sessions.get(sessionToken);

    if (!sessionData) {
      return res.status(401).json({ error: 'Invalid or expired session token' });
    }

    // Check if session is expired
    const now = new Date();
    const expiresAt = new Date(sessionData.expires_at);
    if (now > expiresAt) {
      sessions.delete(sessionToken); // Remove expired session
      return res.status(401).json({ error: 'Session expired' });
    }

    res.json({ user: sessionData.user });
  } catch (error) {
    console.error('Server error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logout = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const sessionToken = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Remove the session
    sessions.delete(sessionToken);

    res.json({ message: 'Logout berhasil' });
  } catch (error) {
    console.error('Server error during logout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add function to get all users (for debugging only)
const getAllUsers = (req, res) => {
  try {
    const userList = Array.from(users.values());
    res.json({ users: userList });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  emailLogin,
  getUserFromSession,
  logout,
  getAllUsers
};