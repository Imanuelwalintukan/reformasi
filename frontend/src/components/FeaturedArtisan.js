import React from 'react';
import './FeaturedArtisan.css';
import artisanImage from '../assets/images/artisan.jpg'; // Placeholder image

const FeaturedArtisan = () => {
  return (
    <section className="featured-artisan">
      <div className="container">
        <div className="artisan-content">
          <h2 className="section-title">Meet The Maker</h2>
          <h3>Elara Vance</h3>
          <p className="artisan-bio">
            "For me, clay is a canvas for emotion. Each piece is a conversation between my hands and the earth. I find beauty in simplicity and the quiet strength of a well-made form. My hope is that my work brings a sense of calm and mindful presence into your home."
          </p>
          <button className="cta-button secondary">Discover Her Collection</button>
        </div>
        <div className="artisan-image-wrapper">
          <img src={artisanImage} alt="Artisan Elara Vance crafting pottery" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisan;
