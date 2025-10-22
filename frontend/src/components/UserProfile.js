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
      // Isi data awal dari user Supabase
      setProfile({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || '',
        phone: user.user_metadata?.phone || '',
        address: user.user_metadata?.address || ''
      });
      setEditData({
        full_name: user.user_metadata?.full_name || '',
        phone: user.user_metadata?.full_name?.phone || '',
        address: user.user_metadata?.address || ''
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Set data edit dengan data saat ini
      setEditData({
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address
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
      // Kita akan mengirim permintaan ke backend untuk update profil
      
      const response = await fetch(`http://localhost:5000/api/users/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')).access_token : ''}`
        },
        body: JSON.stringify(editData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal memperbarui profil');
      }

      // Update state profil dengan data baru
      setProfile(prev => ({
        ...prev,
        ...editData
      }));
      
      setIsEditing(false);
      setMessage('Profil berhasil diperbarui!');
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
              <label>Telepon:</label>
              <span>{profile.phone || '-'}</span>
            </div>
            
            <div className="info-group">
              <label>Alamat:</label>
              <span>{profile.address || '-'}</span>
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
            
            <div className="input-group">
              <label htmlFor="phone">Telepon</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="address">Alamat</label>
              <input
                type="text"
                id="address"
                name="address"
                value={editData.address}
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