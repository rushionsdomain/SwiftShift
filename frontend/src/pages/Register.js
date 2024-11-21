import React, { useState, useContext } from "react";
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
    // Save user details in the context
    setUserDetails({ email, password, name });
    console.log("Registering:", name, email);
    setError("");
    onRegisterSuccess();
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-content">
          {/* Left Side: Image */}
          <div className="register-image">
            <img src={one} alt="Registration" className="image" />
          </div>

          {/* Right Side: Registration Form */}
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

            <div className="login-link">
              <a href="/login">Already have an account? Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
