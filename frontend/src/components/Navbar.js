import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faEnvelope, faHouse, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
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
          <Link to="/home">
            <FontAwesomeIcon
              icon={faHouse}
              style={{ marginRight: "10px" }}
            />
            Home
          </Link>
        </li>
        <li>
          <Link to="/book-move">
            <FontAwesomeIcon
              icon={faTruck}
              style={{ marginRight: "10px" }}
            />
            Book Move
          </Link>
        </li>
        <li>
          <Link to="/my-bookings">
            <FontAwesomeIcon
              icon={faClipboardList}
              style={{ marginRight: "10px" }}
            />
            My Bookings
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ marginRight: "10px" }}
            />
            Contact
          </Link>
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
