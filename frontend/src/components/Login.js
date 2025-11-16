import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    full_name: '',  // Tambahkan full_name untuk dummy login
    password: ''    // Tetap simpan untuk kompatibilitas tampilan
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

    try {
      // Kita akan menggunakan endpoint dummy login
      // Kirim email dan full_name ke endpoint dummy
      const response = await fetch('/api/dummy/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          full_name: credentials.full_name || credentials.email.split('@')[0]  // Gunakan nama dari email jika full_name kosong
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login gagal. Periksa kembali email dan nama Anda.');
      }

      // Gunakan fungsi login dari context dengan data user dari response
      login(data);

      // Arahkan ke halaman utama
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    console.log('Dummy login successful:', data);
    // Gunakan fungsi login dari context dengan data user dari response
    login(data);
  };

  const handleGoogleError = (error) => {
    setError('Dummy login gagal. Silakan coba lagi.');
    console.error('Dummy login error:', error);
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
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="full_name">Nama Lengkap</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={credentials.full_name}
              onChange={handleChange}
              placeholder="Nama akan diambil dari email jika kosong"
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

        <div className="login-footer">
          <p>Belum punya akun? <a href="/signup">Daftar di sini</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;