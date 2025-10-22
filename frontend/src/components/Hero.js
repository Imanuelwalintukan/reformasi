import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleShopNow = () => {
    if (!user) {
      // Jika belum login, arahkan ke signup
      navigate('/signup');
    } else {
      // Jika sudah login, redirect ke products page
      navigate('/products');
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <h2>Welcome to POT & GERABAH</h2>
        <p>Discover our vibrant collection of beautifully crafted pots and ceramic items</p>
        <button className="cta-button" onClick={handleShopNow}>Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;