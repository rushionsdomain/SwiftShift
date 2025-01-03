import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import two from "../assets/images//two.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import {
  faFile,
  faMoneyBill,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book-move");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Start your exciting journey with us</h1>
          <p>
            A team of moving professionals dedicated to providing you with the
            best moving services
          </p>
          <button className="cta-button" onClick={handleBookNow}>Discover More</button>
        </div>
        <div className="hero-image">
          <img src={two} alt="Moving Illustration" />
        </div>
      </header>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <FontAwesomeIcon icon={faFile} className="" />
            <img src="https://shorturl.at/7xMWg" alt="Enter Details" />
            <h3>Enter Your Details</h3>
            <p>Specify when, where, and what you need help with.</p>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faMoneyBill} className="" />
            <img src="https://shorturl.at/fOytX" alt="Get Your Price" />
            <h3>Get Your Price</h3>
            <p>Select one or two Movers and receive an instant quote.</p>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faCalendar} className="" />
            <img src="https://shorturl.at/rduKG" alt="Book Your Move" />
            <h3>Book Your Move</h3>
            <p>Schedule your move in minutes.</p>
          </div>
          <div className="step">
            <FontAwesomeIcon icon={faComment} className="" />
            <img src="https://shorturl.at/rghu9" alt="Track and Communicate" />
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
            <img src="https://shorturl.at/yZNWk" alt="Bedsitter" />
            <p>Bedsitter</p>
          </div>
          <div className="category">
            <img
              src="https://shorturl.at/USeuB"
              alt="One Bedroom"
            />
            <img src="https://shorturl.at/4XKOR" alt="One Bedroom" />
            <p>One Bedroom</p>
          </div>
          <div className="category">
            <img src="https://shorturl.at/F3RoS" alt="Studio" />
            <p>Studio</p>
          </div>
          <div className="category">
            <img src="https://shorturl.at/wKHku" alt="Two Bedroom" />
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

      {/* Call to Action Footer */}
      <div className="cta-footer">
        <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
      </div>

      <footer>
        <p>&copy; 2024 Swift Shift Developed by us. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;