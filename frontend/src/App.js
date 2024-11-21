import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar"; // Import Navbar
import Main from "./pages/Main"; // Import Main
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import BookMove from "./pages/BookMove";
import MyBooking from "./pages/MyBookings";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin"; // Import AdminLogin
import AdminDashboard from "./pages/AdminDashboard"; // Import AdminDashboard

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      {isAuthenticated && <Navbar />} {/* Show Navbar only if authenticated */}
      <Routes>
        {/* Main Page for selecting Admin or User */}
        <Route path="/" element={<Main />} />

        {/* User Routes */}
        <Route path="/landing-page" element={<LandingPage />} />
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

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
