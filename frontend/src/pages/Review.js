import React, { useState } from "react";
import "./Review.css";

function Review() {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      customer: "John Doe",
      message: "The service was late by 30 minutes.",
      date: "2024-11-10",
      resolved: false,
    },
    {
      id: 2,
      customer: "Jane Smith",
      message: "Excellent service! Highly recommend.",
      date: "2024-11-12",
      resolved: false,
    },
    {
      id: 3,
      customer: "Bob Lee",
      message: "Driver was rude and unhelpful.",
      date: "2024-11-15",
      resolved: false,
    },
  ]);

  const resolveComplaint = (id) => {
    setFeedback((prevFeedback) =>
      prevFeedback.map((item) =>
        item.id === id ? { ...item, resolved: true } : item
      )
    );
  };

  return (
    <div className="review">
      <h2>Customer Feedback</h2>
      {feedback.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="feedback-list">
          {feedback.map((item) => (
            <li
              key={item.id}
              className={`feedback-item ${item.resolved ? "resolved" : ""}`}
            >
              <p>
                <strong>Customer:</strong> {item.customer}
              </p>
              <p>
                <strong>Message:</strong> {item.message}
              </p>
              <p>
                <strong>Date:</strong> {item.date}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {item.resolved ? (
                  <span className="resolved-label">Resolved</span>
                ) : (
                  <button
                    className="resolve-button"
                    onClick={() => resolveComplaint(item.id)}
                  >
                    Mark as Resolved
                  </button>
                )}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Review;
