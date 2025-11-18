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
  const [message, setMessage] = useState('');
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
    setMessage('');

    // Validasi password
    if (formData.password !== formData.confirm_password) {
      setError('Password dan konfirmasi password tidak cocok');
      setIsLoading(false);
      return;
    }

    // Dummy signup logic
    console.log('Dummy signup successful for:', formData.email);
    setMessage('Registrasi dummy berhasil! Silakan kembali ke halaman login.');
    
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Redirect to login after 2 seconds

    setIsLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Buat Akun Baru (Dummy)</h2>
          <p>Bergabunglah dengan kami dan nikmati pengalaman berbelanja yang menyenangkan</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        
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
            {isLoading ? 'Memproses...' : 'Daftar (Dummy)'}
          </button>
        </form>
        
        <div className="divider">
          <span>atau daftar dengan</span>
        </div>
        
        <GoogleLoginButton />
        
        <div className="signup-footer">
          <p>Sudah punya akun? <a href="/login">Masuk di sini</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
