import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import LogoutModal from './LogoutModal';

const Header = () => {
  const { user, logout, loading } = useAuth();
  const { getCartItemCount } = useCart();
  const { getWishlistItemCount } = useWishlist();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const cartItemCount = getCartItemCount();
  const wishlistItemCount = getWishlistItemCount();

  if (loading) {
    return <header className="header">Loading...</header>;
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
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Earthen Collective</Link>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/ai-assistant">AI Assistant</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <Link to="/wishlist">
                Wishlist
                {wishlistItemCount > 0 && (
                  <span className="cart-count">{wishlistItemCount}</span>
                )}
              </Link>
            </li>
            <li>
              <Link to="/cart">
                Cart 
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </Link>
            </li>
            {user ? (
              <li className="user-info">
                <Link to="/profile">Halo, {user.email || user.user_metadata?.full_name || 'Pengguna'}</Link>
                <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
              </li>
            ) : (
              <li><Link to="/login">Sign In / Sign Up</Link></li>
            )}
          </ul>
        </nav>
      </div>
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={handleLogoutCancel} 
        onConfirm={handleLogoutConfirm} 
        user={user} 
      />
    </header>
  );
};

export default Header;