import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  // States for user data
  const [users, setUsers] = useState([]); // List of all registered users
  const [currentUser, setCurrentUser] = useState(null); // Currently logged-in user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Password change mode
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Load users and current user from localStorage on component mount
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUsers(savedUsers);
    if (savedUser) {
      setCurrentUser(savedUser);
      setFormData(savedUser);
    } else {
      navigate("/login"); // Redirect to login if no user is logged in
    }
  }, [navigate]);

  // Save updated user list to localStorage
  const saveUsersToStorage = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Save Profile
  const saveProfile = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const emailInUse = users.some(
      (user) => user.email === formData.email && user.email !== currentUser?.email
    );
    if (emailInUse) {
      setErrorMessage("Email already in use. Please use another email.");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? formData : user
    );

    saveUsersToStorage(updatedUsers);
    setCurrentUser(formData);
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setIsEditing(false);
    setErrorMessage("");
  };

  // Change Password
  const changePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (currentPassword !== currentUser.password) {
      setErrorMessage("Current password is incorrect.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const updatedUser = { ...currentUser, password: newPassword };
    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    saveUsersToStorage(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsChangingPassword(false);
    setErrorMessage("");
    alert("Password updated successfully.");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Profile Information */}
      <div className="user-info">
        <h3>User Information</h3>
        {isEditing ? (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </label>
          </>
        ) : (
          <>
            <p>Name: {currentUser?.name}</p>
            <p>Email: {currentUser?.email}</p>
            <p>Phone: {currentUser?.phone}</p>
            <p>Address: {currentUser?.address}</p>
          </>
        )}
      </div>

      {/* Account Settings */}
      <div className="account-settings">
        <h3>Account Settings</h3>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
        <button onClick={() => setIsChangingPassword(!isChangingPassword)}>
          {isChangingPassword ? "Cancel" : "Change Password"}
        </button>
      </div>

      {/* Change Password Section */}
      {isChangingPassword && (
        <div className="change-password">
          <label>
            Current Password:
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
            />
          </label>
          <button onClick={changePassword}>Save Password</button>
        </div>
      )}

      {/* Support Section */}
      <div className="support">
        <button onClick={() => navigate("/contactus")}>Contact Support</button>
      </div>

      {/* Logout */}
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
