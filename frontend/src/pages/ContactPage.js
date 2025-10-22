import React from 'react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <p>Have questions about our products or need assistance with your order? We'd love to hear from you!</p>
        
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p><strong>Email:</strong> info@ebusinesscolorful.com</p>
          <p><strong>Phone:</strong> +62 856 9625 6729</p>
          <p><strong>Address:</strong> Desa Pulutan, Kecamatan Remboken, Kabupaten Minahasa, 95611</p>
        </div>
        
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;