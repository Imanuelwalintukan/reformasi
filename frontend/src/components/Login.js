import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validasi input
    if (!credentials.email) {
      setError('Email wajib diisi');
      setIsLoading(false);
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setError('Format email tidak valid');
      setIsLoading(false);
      return;
    }

    try {
      // Simulasikan login hanya dengan data lokal
      const userId = Date.now().toString(); // ID sementara untuk user
      const userData = {
        user: {
          id: userId,
          email: credentials.email,
          full_name: credentials.email.split('@')[0] || 'Pengguna', // Gunakan nama sebelum @ sebagai nama
          created_at: new Date().toISOString()
        },
        session_token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      };

      // Gunakan fungsi login dari context
      login(userData);

      // Arahkan ke halaman utama
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Selamat Datang Kembali</h2>
          <p>Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="masukkan email Anda"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="masukkan password Anda"
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="login-footer">
          <p>Belum punya akun? <a href="/signup">Daftar di sini</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
