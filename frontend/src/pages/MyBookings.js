import React, { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

function MyBooking() {
  const { bookingDetails } = useContext(BookingContext);

  const hasBookings = bookingDetails !== null;

  return (
    <div className="my-booking">
      <h2>My Bookings</h2>
      {hasBookings ? (
        <table>
          <thead>
            <tr>
              <th>Booking Date</th>
              <th>Current Location</th>
              <th>New Location</th>
              <th>Inventory</th>
              <th>Mover</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bookingDetails.date}</td>
              <td>{bookingDetails.currentLocation}</td>
              <td>{bookingDetails.newLocation}</td>
              <td>{bookingDetails.selectedInventory.join(", ")}</td>
              <td>{bookingDetails.mover}</td>
              <td>${bookingDetails.price}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Bookings will appear here.</p>
      )}
    </div>
  );
}

export default MyBooking;
