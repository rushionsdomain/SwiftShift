import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { userDetails, setUserDetails, setIsAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(userDetails);

  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication from context
    setIsAuthenticated(false);
    setUserDetails({});

    // Clear authentication from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userDetails");

    // Redirect to the homepage after logging out
    navigate("/");
  };

  // Function to handle editing user profile
  const handleEditProfile = () => {
    if (isEditing) {
      setUserDetails(editedDetails);
      localStorage.setItem("userDetails", JSON.stringify(editedDetails));
    }
    setIsEditing(!isEditing);
  };

  const handleChangePassword = () => {
    alert("Password change functionality coming soon!");
  };

  // Function to navigate to the Contact page
  const navigateToContact = () => {
    navigate("/contact"); // Navigate to the Contact page
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">My Profile</h2>

      {/* User Info Section */}
      <div className="user-info">
        <h3>User Information</h3>
        {isEditing ? (
          <>
            <label>
              Name:{" "}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:{" "}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone:{" "}
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address:{" "}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <input
                type="tel"
                value={editedDetails.phone}
                onChange={(e) =>
                  setEditedDetails({ ...editedDetails, phone: e.target.value })
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
            <p>
              <strong>Phone:</strong> {userDetails.phone || "+254 700 123456"}
            </p>
          </>
        )}
        <p>
          <strong>Address:</strong> Nairobi, Kenya
        </p>
      </div>

      {/* Account Settings Section */}
      <div className="account-settings">
        <h3>Account Settings</h3>
        {isEditing ? (
          <button className="settings-button" onClick={saveProfile}>
            Save Changes
          </button>
        ) : (
          <button className="settings-button" onClick={toggleEditMode}>
            Edit Profile
          </button>
        )}
        <button className="settings-button" onClick={toggleChangePassword}>
          {isChangingPassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {/* Change Password Section */}
      {isChangingPassword && (
        <div className="change-password-section">
          <h3>Change Password</h3>
          <label>
            Current Password:
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </label>
          <button className="save-password-button" onClick={saveNewPassword}>
            Save New Password
          </button>
        </div>
      )}

      {/* Support Section */}
      <div className="support-section">
        <h3>Support</h3>
        <p>Need help? Contact our support team for assistance.</p>
        <button className="support-button" onClick={navigateToContact}>
          Contact Support
        </button>
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
