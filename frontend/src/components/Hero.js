import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Hero.css';

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
        <h2 className="fade-in-up">Handcrafted Pottery for the Modern Soul</h2>
        <p className="fade-in-up delay-1">Discover unique, artisanal earthenware that brings warmth and character to your space.</p>
        <button className="cta-button fade-in-up delay-2" onClick={handleShopNow}>Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;