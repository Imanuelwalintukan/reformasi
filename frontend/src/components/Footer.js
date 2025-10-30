import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Earthen Collective</h3>
            <p>Handcrafted pottery for the modern soul.</p>
          </div>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            {/* The href attribute requires a valid value to be accessible. */}
            <a href="/faq">FAQ</a>
          </div>
          <div className="footer-socials">
            {/* The href attribute requires a valid value to be accessible. */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Earthen Collective. All Rights Reserved.</p>
          <p>© 2025 Refomasi. All rights reserved.</p>
          <p>direct by 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;