// src/context/BookingContext.js
import React, { createContext, useState, useEffect } from "react";

// Create a Context for the booking details
export const BookingContext = createContext();

// Create a provider component
export const BookingProvider = ({ children }) => {
  // Retrieve initial state from localStorage
  const initialBookingDetails = JSON.parse(
    localStorage.getItem("bookingDetails")
  );

  const [bookingDetails, setBookingDetails] = useState(
    initialBookingDetails || null
  );

  // Save booking details to localStorage whenever they change
  useEffect(() => {
    if (bookingDetails) {
      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    }
  }, [bookingDetails]);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};
