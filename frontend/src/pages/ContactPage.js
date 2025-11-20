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
            <p><strong>Studio Location:</strong> Minahasa, Sulawesi Utara, Indonesia (By Appointment)</p>
            <p><strong>Working Hours:</strong> Monday-Friday 09:00-17:00 WIB</p>
            <p><strong>WhatsApp:</strong> +62 812-3456-7890</p>
          </div>
          <div className="contact-socials">
            <a href="https://www.instagram.com/earthen_collective" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.pinterest.com/earthen_collective" target="_blank" rel="noopener noreferrer">Pinterest</a>
            <a href="https://www.facebook.com/earthen_collective" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="Enter your email address" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="What is this regarding?" required />
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
