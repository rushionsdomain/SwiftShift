// Profile.js
import React from "react";
import "./Profile.css";

function Profile() {
  // Mock user data (replace with real data from your context or API)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 123456",
    address: "Nairobi, Kenya",
  };

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here, e.g., clear auth tokens, redirect to login page
    console.log("User logged out");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">My Profile</h2>

      {/* User Info Section */}
      <div className="user-info">
        <h3>User Information</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
      </div>

      {/* Account Settings Section */}
      <div className="account-settings">
        <h3>Account Settings</h3>
        <button className="settings-button">Edit Profile</button>
        <button className="settings-button">Change Password</button>
      </div>

      {/* Support Section */}
      <div className="support-section">
        <h3>Support</h3>
        <p>Need help? Contact our support team for assistance.</p>
        <button className="support-button">Contact Support</button>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
