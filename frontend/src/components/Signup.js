import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Format email tidak valid');
      setIsLoading(false);
      return;
    }

    // Validasi nama lengkap
    if (!formData.full_name.trim()) {
      setError('Nama lengkap wajib diisi');
      setIsLoading(false);
      return;
    }

    try {
      // Simulasikan registrasi lokal tanpa koneksi backend
      // Dalam sistem tanpa backend, kita hanya perlu membuat user dan menyimpan di localStorage
      const userId = Date.now().toString();
      const userData = {
        user: {
          id: userId,
          email: formData.email,
          full_name: formData.full_name,
          created_at: new Date().toISOString()
        },
        session_token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      };

      // Simpan data user ke localStorage
      localStorage.setItem('auth_user', JSON.stringify(userData.user));
      localStorage.setItem('session_token', userData.session_token);

      // Arahkan ke halaman login setelah registrasi berhasil
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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

        <div className="signup-footer">
          <p>Sudah punya akun? <a href="/login">Masuk di sini</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
