import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
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

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login gagal. Periksa kembali email dan password Anda.');
      }

      // Gunakan fungsi login dari context
      login(data.user, data.session);

      // Arahkan ke halaman utama
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    console.log('Google login successful:', data);
  };

  const handleGoogleError = (error) => {
    setError('Login dengan Google gagal. Silakan coba lagi.');
    console.error('Google login error:', error);
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
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