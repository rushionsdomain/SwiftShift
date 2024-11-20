// src/pages/Login.js
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";
import loginImage from "../assets/images/three.webp";

function Login() {
  const { setIsAuthenticated, setUserDetails } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const registeredDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (
      registeredDetails &&
      registeredDetails.email === email &&
      registeredDetails.password === password
    ) {
      setError("");
      setIsAuthenticated(true);
      setUserDetails(registeredDetails);
      navigate("/home");
    } else {
      setError("Wrong username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="custom-login-card">
        <div className="login-image">
          <img src={loginImage} alt="Login" className="image" />
        </div>
        <div className="login-form">
          <h2 className="login-heading">Login to SwiftShift</h2>
          <p className="login-tag">Quick and simple login</p>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <p className="switch-auth">
            Don’t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
