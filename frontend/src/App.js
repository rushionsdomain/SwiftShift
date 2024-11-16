// src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar"; // Import Navbar
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import BookMove from "./pages/BookMove";
import MyBooking from "./pages/MyBookings";
import Profile from "./pages/Profile";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      {isAuthenticated && <Navbar />} {/* Show Navbar only if authenticated */}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/book-move"
          element={isAuthenticated ? <BookMove /> : <Navigate to="/" />}
        />
        <Route
          path="/my-bookings"
          element={isAuthenticated ? <MyBooking /> : <Navigate to="/" />}
        />

        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
