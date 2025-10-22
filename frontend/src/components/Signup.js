import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validasi password
    if (formData.password !== formData.confirm_password) {
      setError('Password dan konfirmasi password tidak cocok');
      setIsLoading(false);
      return;
    }

    // Validasi panjang password
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registrasi gagal. Silakan coba lagi.');
      }

      // Arahkan ke halaman login
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    console.log('Google login successful:', data);
    // Jika pengguna login dengan Google, kita bisa redirect ke halaman utama langsung
    navigate('/');
  };

  const handleGoogleError = (error) => {
    setError('Login dengan Google gagal. Silakan coba lagi.');
    console.error('Google login error:', error);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Buat Akun Baru</h2>
          <p>Bergabunglah dengan kami dan nikmati pengalaman berbelanja yang menyenangkan</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="full_name">Nama Lengkap</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="confirm_password">Konfirmasi Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="signup-btn" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>
        
        <div className="divider">
          <span>atau daftar dengan</span>
        </div>
        
        <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        
        <div className="signup-footer">
          <p>Sudah punya akun? <a href="/login">Masuk di sini</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;