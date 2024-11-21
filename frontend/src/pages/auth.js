import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  userDetails: null,
  setIsAuthenticated: () => {},
  setUserDetails: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userDetails");
    setIsAuthenticated(false);
    setUserDetails(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userDetails,
        setIsAuthenticated,
        setUserDetails,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
