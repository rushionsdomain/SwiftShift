import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Profile.css";

function Profile() {
  const navigate = useNavigate(); // Initialize useNavigate

  // State to store user data and manage edit modes
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 123456",
    address: "Nairobi, Kenya",
    password: "password123", // Add a mock initial password for demonstration
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false); // toggle password change mode
  const [formData, setFormData] = useState(user);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load user data from local storage when component mounts
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    console.log("User logged out");
    setUser({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    });
    navigate("/register"); // Redirect to the registration page
  };

  // Toggle edit mode for editing profile data
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Save updated profile data
  const saveProfile = () => {
    setUser(formData);
    localStorage.setItem("userData", JSON.stringify(formData));
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

    // Check if current password matches
    if (currentPassword !== user.password) {
      alert("Current password is incorrect");
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    // Save new password
    const updatedUser = { ...user, password: newPassword };
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    alert("Password successfully updated");

    // Reset password change state
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Handle contact support navigation
  const handleContactSupport = () => {
    navigate("/contactus"); // Redirect to ContactUs page
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
            </label>
          </>
        ) : (
          <>
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
