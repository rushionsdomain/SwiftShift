import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Fleet from "./Fleet";
import Revenue from "./Revenue";
import Review from "./Review";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("Booking Requests");
  const [activeSubsection, setActiveSubsection] = useState("Pending");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any cleanup or logout logic here
    navigate("/"); // Redirect to the main page
  };

  const renderSubsectionContent = () => {
    if (activeSection === "Booking Requests") {
      switch (activeSubsection) {
        case "Pending":
          return <div>Here are the pending booking requests.</div>;
        case "Confirmed":
          return <div>Here are the confirmed booking requests.</div>;
        case "Completed":
          return <div>Here are the completed bookings.</div>;
        default:
          return null;
      }
    }

    if (activeSection === "Customer Details") {
      switch (activeSubsection) {
        case "Profiles":
          return (
            <div>
              <h3>Customer Profiles</h3>
              <p>Name: John Doe</p>
              <p>Contact: john.doe@example.com, +254 700 123456</p>
              <p>Service History: Moved household items on 10th Nov 2024</p>
              <hr />
              <p>Name: Jane Smith</p>
              <p>Contact: jane.smith@example.com, +254 711 654321</p>
              <p>Service History: Moved office equipment on 12th Nov 2024</p>
            </div>
          );
        case "Service History":
          return <div>Here is the detailed service history for customers.</div>;
        default:
          return null;
      }
    }
    return null;
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Booking Requests":
        return (
          <div>
            <h2>Booking Requests</h2>
            <div className="subsection-tabs">
              <button
                className={activeSubsection === "Pending" ? "active-tab" : ""}
                onClick={() => setActiveSubsection("Pending")}
              >
                Pending
              </button>
              <button
                className={activeSubsection === "Confirmed" ? "active-tab" : ""}
                onClick={() => setActiveSubsection("Confirmed")}
              >
                Confirmed
              </button>
              <button
                className={activeSubsection === "Completed" ? "active-tab" : ""}
                onClick={() => setActiveSubsection("Completed")}
              >
                Completed
              </button>
            </div>
            {renderSubsectionContent()}
          </div>
        );
      case "Customer Details":
        return (
          <div>
            <h2>Customer Details</h2>
            <div className="subsection-tabs">
              <button
                className={activeSubsection === "Profiles" ? "active-tab" : ""}
                onClick={() => setActiveSubsection("Profiles")}
              >
                Profiles
              </button>
              <button
                className={
                  activeSubsection === "Service History" ? "active-tab" : ""
                }
                onClick={() => setActiveSubsection("Service History")}
              >
                Service History
              </button>
            </div>
            {renderSubsectionContent()}
          </div>
        );
      case "Fleets":
        return <Fleet />;
      case "Revenue":
        return <Revenue />;
      case "Feedback":
        return <Review />;
      default:
        return <div>Welcome to the Admin Dashboard!</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activeSection === "Booking Requests" ? "active" : ""}
            onClick={() => {
              setActiveSection("Booking Requests");
              setActiveSubsection("Pending"); // Default subsection
            }}
          >
            Booking Requests
          </li>
          <li
            className={activeSection === "Customer Details" ? "active" : ""}
            onClick={() => {
              setActiveSection("Customer Details");
              setActiveSubsection("Profiles"); // Default subsection
            }}
          >
            Customer Details
          </li>
          <li
            className={activeSection === "Fleets" ? "active" : ""}
            onClick={() => setActiveSection("Fleets")}
          >
            Fleets
          </li>
          <li
            className={activeSection === "Revenue" ? "active" : ""}
            onClick={() => setActiveSection("Revenue")}
          >
            Revenue
          </li>
          <li
            className={activeSection === "Feedback" ? "active" : ""}
            onClick={() => setActiveSection("Feedback")}
          >
            Feedback
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
