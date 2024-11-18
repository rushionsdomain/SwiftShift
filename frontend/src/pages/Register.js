// src/pages/Register.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Register.css";
import one from "../assets/images/one.webp";

function Register({ onRegisterSuccess }) {
  const { setUserDetails } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    setUserDetails({ email, password, name });
    localStorage.setItem(
      "userDetails",
      JSON.stringify({ email, password, name })
    );
    setError("");
    onRegisterSuccess();
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-content">
          <div className="register-image">
            <img src={one} alt="Registration" className="image" />
          </div>
          <div className="register-form">
            <h2 className="form-heading">Sign up to Swift Shift</h2>
            <p className="sub-heading">Quick and simple sign up</p>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p className="switch-auth">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
