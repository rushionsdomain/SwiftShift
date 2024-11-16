// src/components/Button.js
import React from "react";
import "./Button.css"; // Import the CSS file for styling

function Button({ onClick, children, className = "" }) {
  return (
    <button onClick={onClick} className={`custom-button ${className}`}>
      {children}
    </button>
  );
}

export default Button;
