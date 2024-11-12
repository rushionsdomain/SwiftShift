// src/components/Card.js
import React from "react";
import "./Card.css";

function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card;
