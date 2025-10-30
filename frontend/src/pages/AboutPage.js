import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>More Than Just Pottery.</h1>
        <p>It's a piece of the earth, shaped by hand, with a story to tell.</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Philosophy</h2>
          <p>
            In a world of mass production, we celebrate the slow, intentional, and imperfect beauty of handcrafted goods. <strong>Earthen Collective</strong> was born from a desire to connect people with functional art that carries a human touch. We believe the objects we bring into our homes should have a soul and a story.
          </p>
        </div>
        <div className="about-section">
          <h2>The Collective</h2>
          <p>
            We are not just a store; we are a curated collection of works from passionate artisans. Our "collective" brings together talented potters and ceramicists, giving them a platform to share their craft. When you purchase from us, you're not just buying a pot—you're supporting an artist's dream and preserving the timeless tradition of handmade pottery.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Journey</h2>
          <p>
            It began in 2024 with a simple observation: the most cherished items are those with a story. We started by visiting small, local studios, discovering incredible talent hidden in plain sight. What started as a small online gallery quickly grew into a vibrant collective, a space where the timeless art of pottery meets the modern connoisseur.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Values</h2>
          <p>
            <strong>Authenticity:</strong> Every piece is genuinely handmade, carrying the unique signature of its maker. <br />
            <strong>Craftsmanship:</strong> We honor the skill and dedication that goes into traditional pottery, ensuring every item is of the highest quality.<br />
            <strong>Community:</strong> We are committed to fostering a supportive network for our artisans, helping them thrive through their craft.
          </p>
        </div>
        <div className="about-section">
          <h2>Our Craft</h2>
          <p>
            Each piece in our collection is unique. Shaped from natural clay and fired with care, they bear the subtle marks of the maker's hands. These are not flaws, but signatures of authenticity. From minimalist designs to rustic textures, our earthenware is crafted to bring a sense of warmth, nature, and mindful living into your space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
