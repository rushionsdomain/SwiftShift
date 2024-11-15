// src/pages/Login.js
import React, { useState, useContext } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import "./login.css"

function Login() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in:", email);
    setIsAuthenticated(true);
  };

  return (
    <Card>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Card>
  );
}

export default Login;
