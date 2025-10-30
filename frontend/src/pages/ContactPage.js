import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page-wrapper">
      <div className="container contact-container">
        <div className="contact-text-section">
          <h1 className="contact-title">Connect with Us</h1>
          <p className="contact-subtitle">
            Whether you have a question about a piece, a story to share, or simply want to say hello, we're here to listen.
          </p>
          <div className="contact-details">
            <p><strong>Email:</strong> ebusinessebusinesskelompok24@gmail.com</p>
            <p><strong>Studio Location:</strong> Minahasa, Indonesia (By Appointment)</p>
          </div>
          <div className="contact-socials">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">Facebook</a>
          </div>
        </div>
        <div className="contact-form-section">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="your.email@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="6" placeholder="Tell us how we can help..." required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
