// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/book-move">Book Move</Link>
        </li>
        <li>
          <Link to="/my-bookings">My Bookings</Link>
        </li>
        {isAuthenticated && (
          <li className="profile-link">
            <Link to="/profile">Profile</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
