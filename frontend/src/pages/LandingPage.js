// src/pages/LandingPage.js
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./LandingPage.css"

function LandingPage() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
  };

  return (
    <div className="landing-page">
      {!isRegistered ? (
        <Register onRegisterSuccess={handleRegistrationSuccess} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default LandingPage;
