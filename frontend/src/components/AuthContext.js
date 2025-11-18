import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi login dengan session token
  const login = (loginResponse) => {
    if (loginResponse) {
      // Simpan user data dan session token
      const userData = {
        ...loginResponse.user,
        session_token: loginResponse.session_token
      };

      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      localStorage.setItem('session_token', loginResponse.session_token);
    }
  };

  // Fungsi logout
  const logout = async () => {
    try {
      // Hapus token dari localStorage
      const token = localStorage.getItem('session_token');

      if (token) {
        // Kirim request logout ke server (opsional)
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).catch(() => {
          // Jika logout gagal, lanjutkan proses logout client-side
          console.log('Logout request failed, continuing with local logout');
        });
      }
    } catch (error) {
      console.error('Error during logout request:', error);
    } finally {
      // Hapus data dari localStorage
      localStorage.removeItem('auth_user');
      localStorage.removeItem('session_token');

      setUser(null);
    }
  };

  // Cek apakah ada user di localStorage saat halaman dimuat
  useEffect(() => {
    const authUser = localStorage.getItem('auth_user');
    const token = localStorage.getItem('session_token');

    if (authUser && token) {
      try {
        const parsedUser = JSON.parse(authUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};