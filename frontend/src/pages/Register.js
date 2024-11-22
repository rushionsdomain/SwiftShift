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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    // Validate all fields are filled
    if (!name || !email || !password || !phone || !address) {
      setError("All fields are required");
      return;
    }

    // Retrieve existing registered users or initialize empty array
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    // Check if user already exists (case-insensitive, trim whitespace)
    const existingUser = registeredUsers.find(
      user => user.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
      console.log("Existing user found:", existingUser);
      setError("User with this email already exists");
      return;
    }

    // Create new user object
    const newUser = { 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      password, 
      phone: phone.trim(), 
      address: address.trim() 
    };

    // Add new user to registered users
    const updatedUsers = [...registeredUsers, newUser];

    // Save to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // Set user details in context
    setUserDetails(newUser);

    // Clear error
    setError("");

    // Trigger registration success
    onRegisterSuccess();
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-content">
          <div className="register-imag">
            <img src={one} alt="Registration" className="image" />
          </div>
          <div className="register-form">
            <h2 className="form-heading">Sign up to Swift Shift</h2>
            <p className="sub-heading">Quick and simple sign up</p>
            {error && <p className="error-message">{error}</p>}
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="Email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
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