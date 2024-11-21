import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";

function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.query) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate sending the query (replace with actual API call if needed)
    alert(`Thank you, ${formData.name}! Your query has been submitted.`);
    setFormData({ name: "", email: "", query: "" });

    // Navigate back to the profile page
    navigate("/profile");
  };

  // Navigate back to the profile page
  const handleBackToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>Have a question or need assistance? Fill out the form below.</p>

      <form onSubmit={handleSubmit} className="contact-us-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Query:
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <div className="contact-us-buttons">
          <button type="submit" className="submit-button">
            Submit Query
          </button>
          <button type="button" onClick={handleBackToProfile} className="back-button">
            Back to Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;
