// src/services/authService.js

const authService = {
  /**
   * Get the current user from local storage.
   * This method assumes that user information is stored in local storage
   * under the key 'currentUser'.
   *
   * @returns {object|null} The user object or null if no user is found.
   */
  getCurrentUser: () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      return user;
    } catch (error) {
      console.error("Error retrieving user from local storage:", error);
      return null;
    }
  },

  /**
   * Save the user information to local storage.
   * This method can be used when a user logs in to save their data.
   *
   * @param {object} user - The user object to be saved.
   */
  setCurrentUser: (user) => {
    try {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } catch (error) {
      console.error("Error saving user to local storage:", error);
    }
  },

  /**
   * Remove the current user from local storage.
   * This method can be used when a user logs out to clear their data.
   */
  clearCurrentUser: () => {
    try {
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.error("Error removing user from local storage:", error);
    }
  },

  /**
   * Check if a user is authenticated.
   * This method checks if there is user data in local storage.
   *
   * @returns {boolean} True if a user is authenticated, false otherwise.
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("currentUser");
  },
};

export default authService;
