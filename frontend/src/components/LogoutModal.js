import React from 'react';
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="logout-modal-icon">🚪</div>
        <h2>Keluar dari Akun</h2>
        <p>Apakah Anda yakin ingin keluar dari akun Anda?</p>
        
        {user && (
          <div className="user-info-preview">
            <p>Sampai jumpa, <strong>{user.email || user.user_metadata?.full_name || 'Pengguna'}</strong>!</p>
          </div>
        )}
        
        <div className="logout-modal-actions">
          <button 
            className="logout-modal-cancel-btn" 
            onClick={onClose}
          >
            Batal
          </button>
          <button 
            className="logout-modal-confirm-btn" 
            onClick={onConfirm}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;