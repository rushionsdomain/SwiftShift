import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to Movers App</h1>
        <p>Your Stress-Free Moving Solution!</p>
        <button className="cta-button">Get Started</button>
      </header>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <img src="path-to-icon1.png" alt="Enter Details" />
            <h3>Enter Your Details</h3>
            <p>Specify when, where, and what you need help with.</p>
          </div>
          <div className="step">
            <img src="path-to-icon2.png" alt="Get Your Price" />
            <h3>Get Your Price</h3>
            <p>Select one or two Movers and receive an instant quote.</p>
          </div>
          <div className="step">
            <img src="path-to-icon3.png" alt="Book Your Move" />
            <h3>Book Your Move</h3>
            <p>Schedule your move in minutes.</p>
          </div>
          <div className="step">
            <img src="path-to-icon4.png" alt="Track and Communicate" />
            <h3>Track and Communicate</h3>
            <p>Contact your Mover in real-time.</p>
          </div>
        </div>
      </section>

      {/* Inventory Categories */}
      <section className="inventory-categories">
        <h2>Inventory Categories</h2>
        <div className="categories-container">
          <div className="category">
            <img src="path-to-bedsitter-icon.png" alt="Bedsitter" />
            <p>Bedsitter</p>
          </div>
          <div className="category">
            <img src="path-to-one-bedroom-icon.png" alt="One Bedroom" />
            <p>One Bedroom</p>
          </div>
          <div className="category">
            <img src="path-to-studio-icon.png" alt="Studio" />
            <p>Studio</p>
          </div>
          <div className="category">
            <img src="path-to-two-bedroom-icon.png" alt="Two Bedroom" />
            <p>Two Bedroom</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Instant Quotes</li>
          <li>Real-Time Tracking</li>
          <li>Trusted Movers</li>
        </ul>
      </section>

      <footer className="cta-footer">
        <button className="book-now-button">Book Now</button>
      </footer>
    </div>
  );
};

export default Home;
