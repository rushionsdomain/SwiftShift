import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails, setIsAuthenticated } = useContext(AuthContext);

  // State to manage edit modes and form data
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({ ...userDetails });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle logout
  const handleLogout = () => {
    // Remove authentication state
    setIsAuthenticated(false);
    setUserDetails(null);
    
    // Remove user details from localStorage
    localStorage.removeItem("userDetails");
    
    // Navigate to login page
    navigate("/register");
  };

  // Toggle edit mode for editing profile data
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Save updated profile data
  const saveProfile = () => {
    // Retrieve registered users
    const registeredUsers = 
      JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    // Find and update the current user
    const updatedUsers = registeredUsers.map(user => 
      user.email === userDetails.email ? formData : user
    );

    // Save updated users to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // Update context
    setUserDetails(formData);

    // Exit edit mode
    setIsEditing(false);
  };

  // Handle profile input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password change mode
  const toggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Save new password
  const saveNewPassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // Retrieve registered users
    const registeredUsers = 
      JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    // Find the current user
    const currentUserIndex = registeredUsers.findIndex(
      user => user.email === userDetails.email
    );

    // Validate current password
    if (registeredUsers[currentUserIndex].password !== currentPassword) {
      alert("Current password is incorrect");
      return;
    }

    // Validate new password
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    // Update password in the users array
    registeredUsers[currentUserIndex].password = newPassword;

    // Save updated users to localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    // Update user details in context
    setUserDetails({
      ...userDetails,
      password: newPassword
    });

    // Reset password change state
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("Password successfully updated");
  };

  // Handle contact support navigation
  const handleContactSupport = () => {
    navigate("/contactus");
  };

  // If no user details, return null or redirect
  if (!userDetails) {
    navigate("/login");
    return null;
  }

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
            </label>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {userDetails.phone}
            </p>
            <p>
              <strong>Address:</strong> {userDetails.address}
            </p>
          </>
        )}
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
        <button className="support-button" onClick={handleContactSupport}>
         
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