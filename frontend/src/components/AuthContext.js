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

  // Fungsi login dummy
  const login = async (userData) => {
    if (userData && userData.user) {
      // Simpan user data dari response dummy login
      setUser(userData.user);
      // Simpan user data ke localStorage agar tetap login setelah refresh
      localStorage.setItem('dummy_user', JSON.stringify(userData.user));
    }
  };

  // Fungsi logout
  const logout = async () => {
    // Hapus user dari localStorage
    localStorage.removeItem('dummy_user');
    setUser(null);
  };

  // Cek apakah ada user dummy di localStorage saat halaman dimuat
  useEffect(() => {
    const dummyUser = localStorage.getItem('dummy_user');
    if (dummyUser) {
      try {
        const parsedUser = JSON.parse(dummyUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing dummy user from localStorage:', error);
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