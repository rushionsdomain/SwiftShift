// src/context/BookingContext.js
import React, { createContext, useState } from "react";

// Create a Context for the booking details
export const BookingContext = createContext();

// Create a provider component
export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState(null);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};
