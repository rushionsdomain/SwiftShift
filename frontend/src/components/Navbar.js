import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import logoImage from "../assets/images/logo.jpeg";

function Navbar() {
  const { isAuthenticated, userDetails } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="YourLogo" className="logo-image" />
        </Link>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/book-move">Book Move</Link>
        </li>
        <li>
          <Link to="/my-bookings">My Bookings</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      {isAuthenticated && (
        <div className="profile-icon">
          <Link to="/profile" className="profile-icon">
            <div className="user-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className="message">{userDetails?.name}</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
