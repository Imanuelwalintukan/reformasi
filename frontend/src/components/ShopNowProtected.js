import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ProductsPage from '../pages/ProductsPage';

const ShopNowProtected = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Memuat...
      </div>
    );
  }

  if (!user) {
    // Redirect ke signup jika belum login
    return <Navigate to="/signup" replace />;
  }

  // Jika sudah login, tampilkan halaman produk
  return <ProductsPage />;
};

export default ShopNowProtected;