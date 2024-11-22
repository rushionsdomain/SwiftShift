import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact SwiftShift Movers</h1>
        <div className="contact-details">
          <div className="info-section">
            <h2>Location</h2>
            <p>SwiftShift Movers Headquarters</p>
            <p>123 Swift Lane, Nairobi, Kenya</p>
            <p>Postal Code: 00100</p>
          </div>
          <div className="info-section">
            <h2>Contact Details</h2>
            <p>Email: contact@swiftshiftmovers.com</p>
            <p>Phone: +254 700 123 456</p>
            <p>WhatsApp: +254 711 654 321</p>
          </div>
          <div className="info-section">
            <h2>Operating Hours</h2>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button type="submit" className="send-btn">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
