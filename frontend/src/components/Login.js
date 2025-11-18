import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    full_name: '',
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
      // Dummy login logic
      if (!credentials.email) {
        throw new Error('Email tidak boleh kosong');
      }

      const dummyUser = {
        id: new Date().getTime(),
        email: credentials.email,
        user_metadata: {
          full_name: credentials.full_name || credentials.email.split('@')[0],
        },
      };

      // Panggil fungsi login dari context
      login(dummyUser);

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
          <h2>Selamat Datang Kembali (Dummy)</h2>
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
            <label htmlFor="full_name">Nama Lengkap (Opsional)</label>
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
            {isLoading ? 'Memproses...' : 'Masuk (Dummy)'}
          </button>
        </form>

        <div className="divider">
          <span>atau</span>
        </div>

        <GoogleLoginButton />

        <div className="login-footer">
          <p>Belum punya akun? <a href="/signup">Daftar di sini</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
