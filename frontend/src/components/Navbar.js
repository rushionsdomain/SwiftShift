import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faTruck,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logoImage from "../assets/images/logo.jpeg";

function Navbar() {
  const { isAuthenticated, userDetails, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="YourLogo" className="logo-image" />
        </Link>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/home">
            <FontAwesomeIcon icon={faHome} className="nav-icon" />
            <span className="nav-text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/book-move">
            <FontAwesomeIcon icon={faTruck} className="nav-icon" />
            Book Move
          </Link>
        </li>
        <li>
          <Link to="/my-bookings">
            <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" />
            My Bookings
          </Link>
        </li>
      </ul>
      {isAuthenticated && (
        <div className="profile-icon">
          <Link to="/profile" className="profile-icon">
            <div className="user-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className="welcome-message">
              {userDetails?.name}
              <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                Logout
              </button>
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
