import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css"; // Add this import for the styles
import logoImage from "../assets/images/logo.png";

function Main() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/landing-page"); // Redirect to user dashboard
  };

  const handleAdminClick = () => {
    navigate("/admin-login"); // Redirect to admin login
  };

  return (
    <div className="main-page">
      <div className="main-container">
        <div className="logo">
            <img src={logoImage} alt="YourLogo" className="logo-image" />
        </div>
        <h1>Choose an Option:</h1>
        <div className="main-button-group">
          <button className="main-button-user" onClick={handleUserClick}>
            User
          </button>
          <button className="main-button-admin" onClick={handleAdminClick}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
