import React, { useState, useEffect } from 'react';
import { useWishlist } from './WishlistContext';
import './WishlistButton.css';

const WishlistButton = ({ product, size = 'normal' }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist, loading } = useWishlist();
  const [isInWishlistState, setIsInWishlistState] = useState(false);

  useEffect(() => {
    if (product) {
      setIsInWishlistState(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Mencegah klik membuka halaman detail

    if (isInWishlistState) {
      removeFromWishlist(product.id);
      setIsInWishlistState(false);
    } else {
      addToWishlist(product);
      setIsInWishlistState(true);
    }
  };

  if (loading) {
    return <div className={`wishlist-btn loading ${size}`}>...</div>;
  }

  return (
    <button
      className={`wishlist-btn ${isInWishlistState ? 'in-wishlist' : ''} ${size}`}
      onClick={handleWishlistToggle}
      title={isInWishlistState ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
    >
      <svg
        className="wishlist-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.67l-6.11-6.04C3.3 13.06 1 10.2 1 7.5 1 4.42 3.42 2 6.5 2c1.78 0 3.46.84 4.5 2.21C12.04 2.84 13.72 2 15.5 2 18.58 2 21 4.42 21 7.5c0 2.7-2.3 5.56-4.89 8.13z" />
      </svg>
      <span className="wishlist-text">Add to Wishlist</span>
    </button>
  );
};

export default WishlistButton;