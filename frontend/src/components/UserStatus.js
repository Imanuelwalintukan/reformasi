import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LogoutModal from './LogoutModal';
import './UserStatus.css';

const UserStatus = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) {
    return (
      <div className="user-status">
        <span>Belum login</span>
        <Link to="/login" className="login-link">Masuk</Link>
      </div>
    );
  }

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

  return (
    <div className="user-status">
      <span>Halo, {user.email || user.user_metadata?.full_name || 'Pengguna'}!</span>
      <Link to="/profile" className="profile-link">Profil</Link>
      <button onClick={handleLogoutClick} className="logout-link">Keluar</button>
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={handleLogoutCancel} 
        onConfirm={handleLogoutConfirm} 
        user={user} 
      />
    </div>
  );
};

export default UserStatus;