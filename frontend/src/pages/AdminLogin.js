// src/pages/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AdminLogin.css'
import logoImage from "../assets/images/logo.png";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Example authentication check (replace with your own logic)
    if (username === "admin" && password === "admin123") {
      // Set admin authentication (e.g., using context or state)
      // Navigate to admin dashboard
      navigate("/admin-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login">
      <h1>Administrator Login</h1>
      <div className="logo">
        <img src={logoImage} alt="YourLogo" className="logo-image" />
      </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
