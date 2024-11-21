import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  // State to store user data and manage edit modes
  const [users, setUsers] = useState([]); // List of all users
  const [currentUser, setCurrentUser] = useState(null); // Logged-in user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Load users and current user data from local storage when component mounts
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);

    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setCurrentUser(savedUser);
      setFormData(savedUser);
      setIsEditing(false);
    }
  }, []);

  // Save updated user list to local storage
  const saveUsersToStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/register");
  };

  // Save updated profile data
  const saveProfile = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setErrorMessage("Please fill in all required fields!");
      return;
    }

    // Check if email is already in use by another user
    const emailInUse = users.some(
      (user) => user.email === formData.email && user.email !== currentUser?.email
    );
    if (emailInUse) {
      setErrorMessage("This email is already in use. Please use another email.");
      return;
    }

    setErrorMessage("");

    // Update or add the user
    const updatedUsers = currentUser
      ? users.map((user) => (user.email === currentUser.email ? formData : user))
      : [...users, formData];

    saveUsersToStorage(updatedUsers);
    setCurrentUser(formData);
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setIsEditing(false);
  };

  // Handle profile input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle password validation
  const validatePassword = (password) => {
    if (password !== currentUser?.password) {
      setErrorMessage("Incorrect password. Please try again.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">My Profile</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

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
            <label>
              Password:{" "}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {currentUser?.name}
            </p>
            <p>
              <strong>Email:</strong> {currentUser?.email}
            </p>
            <p>
              <strong>Phone:</strong> {currentUser?.phone}
            </p>
            <p>
              <strong>Address:</strong> {currentUser?.address}
            </p>
          </>
        )}
      </div>

      {/* Account Settings Section */}
      <div className="account-settings">
        <h3>Account Settings</h3>
        {isEditing ? (
          <button className="settings-button" onClick={saveProfile}>
            Save Profile
          </button>
        ) : (
          <button className="settings-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
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
