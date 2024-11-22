import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails, setIsAuthenticated } = useContext(AuthContext);

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
    setIsAuthenticated(false);
    setUserDetails(null);
    localStorage.removeItem("userDetails");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");  // Changed from /register to /login to match standard flow
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({ ...userDetails }); // Reset form data when entering edit mode
    }
  };

  // Save profile updates
  const saveProfile = () => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    const updatedUsers = registeredUsers.map(user => 
      user.email === userDetails.email ? formData : user
    );

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    setUserDetails(formData);
    setIsEditing(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle password change section
  const toggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
    if (!isChangingPassword) {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save new password
  const saveNewPassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters long");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const currentUserIndex = registeredUsers.findIndex(
      user => user.email === userDetails.email
    );

    if (registeredUsers[currentUserIndex].password !== currentPassword) {
      alert("Current password is incorrect");
      return;
    }

    // Update password
    registeredUsers[currentUserIndex].password = newPassword;
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    setUserDetails({
      ...userDetails,
      password: newPassword
    });

    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("Password successfully updated");
  };

  // Navigate to contact page
  const handleContactSupport = () => {
    navigate("/contact");
  };

  // Redirect if not logged in
  if (!userDetails) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-header">My Profile</h2>

      {/* User Information Section */}
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
                required
              />
            </label>
            <label>
              Email:{" "}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Phone:{" "}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Address:{" "}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </label>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
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

      {/* Password Change Section */}
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
              required
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
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
          Contact Support
        </button>
      </div>

      {/* Logout Section */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;