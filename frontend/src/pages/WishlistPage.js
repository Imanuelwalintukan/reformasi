import React, { useState, useEffect } from 'react';
import { useWishlist } from '../components/WishlistContext';
import { useAuth } from '../components/AuthContext';
import { convertToRupiah } from '../utils/currencyFormatter';
import './WishlistPage.css';

const WishlistPage = () => {
  const { user } = useAuth();
  const { items, removeFromWishlist, loading } = useWishlist();
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  if (!user) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-prompt">
            <h2>Log In Diperlukan</h2>
            <p>Silakan login untuk melihat wishlist Anda.</p>
            <a href="/login" className="login-link">Login Sekarang</a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <h1 className="wishlist-title">Wishlist Saya</h1>
          <div className="loading">Memuat wishlist...</div>
        </div>
      </div>
    );
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    setLocalItems(prev => prev.filter(item => item.productId !== productId));
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="wishlist-title">Wishlist Saya</h1>
        
        {localItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-content">
              <div className="empty-icon">❤️</div>
              <h3>Wishlist Anda Kosong</h3>
              <p>Produk yang Anda sukai akan muncul di sini.</p>
              <a href="/products" className="browse-products-link">Jelajahi Produk</a>
            </div>
          </div>
        ) : (
          <div className="wishlist-grid">
            {localItems.map((item) => (
              <div key={item.productId} className="wishlist-item">
                <div className="wishlist-item-image">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="wishlist-actions">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveFromWishlist(item.productId)}
                      title="Hapus dari wishlist"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="wishlist-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="price">{convertToRupiah(item.product.price)}</p>
                  <p className="category">Kategori: {item.product.category}</p>
                  <p className="description">{item.product.description}</p>
                  <div className="wishlist-item-actions">
                    <a 
                      href={`/products/${item.product.id}`} 
                      className="view-details-btn"
                    >
                      Lihat Detail
                    </a>
                    <button className="add-to-cart-btn">
                      Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;