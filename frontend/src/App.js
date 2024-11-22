import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import BookMove from "./pages/BookMove";
import MyBooking from "./pages/MyBookings";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login"; // Import Login component

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      {isAuthenticated && <Navbar />} {/* Show Navbar only if authenticated */}
      <Routes>
        {/* Main Page for selecting Admin or User */}
        <Route path="/" element={<Main />} />
        {/* User Routes */}
        <Route path="/login" element={<Login />} /> {/* Login Route */}
        <Route path="/landing-page" element={<LandingPage />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/book-move"
          element={isAuthenticated ? <BookMove /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-bookings"
          element={isAuthenticated ? <MyBooking /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={isAuthenticated ? <Contact /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route 
          path="/register"
          element = {<Register />}
        />
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
