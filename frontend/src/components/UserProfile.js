import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import LogoutModal from './LogoutModal';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (user) {
      // Isi data awal dari user data
      setProfile({
        id: user.id,
        email: user.email,
        full_name: user.full_name || '',
        created_at: user.created_at || ''
      });
      setEditData({
        full_name: user.full_name || ''
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Set data edit dengan data saat ini
      setEditData({
        full_name: profile.full_name
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // Di sini kamu akan mengupdate profil pengguna
      // Untuk sementara sistem kita hanya menyimpan nama lengkap di backend

      // Endpoint update profil akan diimplementasikan nanti
      // Saat ini kita hanya menampilkan pesan bahwa data akan disimpan
      console.log('Update profil:', editData);

      // Update state profil dengan data baru
      setProfile(prev => ({
        ...prev,
        full_name: editData.full_name
      }));

      setIsEditing(false);
      setMessage('Profil berhasil diperbarui!');

      // Simulasi update ke backend
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    await logout();
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Profil Pengguna</h2>
          <p>Anda perlu login terlebih dahulu untuk mengakses halaman ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profil Pengguna</h2>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        {!isEditing ? (
          <div className="profile-info">
            <div className="info-group">
              <label>Email:</label>
              <span>{profile.email}</span>
            </div>

            <div className="info-group">
              <label>Nama Lengkap:</label>
              <span>{profile.full_name || '-'}</span>
            </div>

            <div className="info-group">
              <label>ID Pengguna:</label>
              <span>{profile.id || '-'}</span>
            </div>

            <div className="info-group">
              <label>Dibuat pada:</label>
              <span>{profile.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'}</span>
            </div>

            <button className="edit-btn" onClick={handleEditToggle}>Edit Profil</button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="profile-form">
            <div className="input-group">
              <label htmlFor="full_name">Nama Lengkap</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={editData.full_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">Simpan</button>
              <button type="button" className="cancel-btn" onClick={handleEditToggle}>Batal</button>
            </div>
          </form>
        )}

        <div className="profile-actions">
          <button className="logout-btn" onClick={handleLogoutClick}>Keluar</button>
        </div>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        user={user}
      />
    </div>
  );
};

export default UserProfile;