import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import FeaturedArtisan from '../components/FeaturedArtisan';

const HomePage = () => {
  return (
    <div className="homepage">
      <Hero />
      <div className="fade-in-up delay-1">
        <FeaturedArtisan />
      </div>
      <div className="fade-in-up delay-2">
        <Products />
      </div>
    </div>
  );
};

export default HomePage;