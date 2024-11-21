import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css"; // Add this import for the styles

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
        <h1>Welcome! Choose an Option:</h1>
        <div className="main-button-group">
          <button className="main-button user-button" onClick={handleUserClick}>
            User
          </button>
          <button
            className="main-button admin-button"
            onClick={handleAdminClick}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
