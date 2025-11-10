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
        fill={isInWishlistState ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
        />
      </svg>
    </button>
  );
};

export default WishlistButton;