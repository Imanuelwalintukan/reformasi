import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

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

  useEffect(() => {
    // Cek apakah ada user saat aplikasi dimuat
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      }
      setLoading(false);
    };

    fetchUser();

    // Setup auth listener untuk menangani perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session.user);
          localStorage.setItem('user', JSON.stringify(session.user));
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('session');
        }
      }
    );

    // Cleanup subscription saat komponen unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = (userData, sessionData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (sessionData) {
      localStorage.setItem('session', JSON.stringify(sessionData));
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('session');
  };

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