import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "./Profile.css";

function Profile() {
  const { userDetails, setUserDetails } = useContext(AuthContext); // Access user details from context
  const navigate = useNavigate(); // Initialize useNavigate

  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editedDetails, setEditedDetails] = useState(userDetails); // State for edited details

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  // Function to handle editing user profile
  const handleEditProfile = () => {
    if (isEditing) {
      setUserDetails(editedDetails); // Save changes to context and localStorage
      localStorage.setItem("userDetails", JSON.stringify(editedDetails));
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  // Function to handle password change
  const handleChangePassword = () => {
    alert("Password change functionality coming soon!");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">My Profile</h2>

      {/* User Info Section */}
      <div className="user-info">
        <h3>User Information</h3>
        {isEditing ? (
          <div>
            <p>
              <strong>Name:</strong>{" "}
              <input
                type="text"
                value={editedDetails.name}
                onChange={(e) =>
                  setEditedDetails({ ...editedDetails, name: e.target.value })
                }
              />
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <input
                type="email"
                value={editedDetails.email}
                onChange={(e) =>
                  setEditedDetails({ ...editedDetails, email: e.target.value })
                }
              />
            </p>
          </div>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
          </>
        )}
        <p>
          <strong>Phone:</strong> +254 700 123456
        </p>
        <p>
          <strong>Address:</strong> Nairobi, Kenya
        </p>
      </div>

      {/* Account Settings Section */}
      <div className="account-settings">
        <h3>Account Settings</h3>
        <button className="settings-button" onClick={handleEditProfile}>
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
        <button className="settings-button" onClick={handleChangePassword}>
          Change Password
        </button>
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
