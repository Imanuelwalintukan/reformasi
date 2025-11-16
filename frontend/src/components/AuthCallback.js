import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Komponen AuthCallback sekarang digunakan untuk redirect umum
// karena login dummy tidak memerlukan callback khusus dari service provider
const AuthCallback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect berdasarkan status login
    if (user) {
      // Jika user sudah login, redirect ke halaman utama
      navigate('/');
    } else {
      // Jika belum login, kembali ke halaman login
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="auth-callback">
      <p>Memproses login...</p>
    </div>
  );
};

export default AuthCallback;