import React, { useContext, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faStar, faEdit } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyBooking.css";

function MyBooking() {
  const { bookingDetails } = useContext(BookingContext);
  const [rating, setRating] = useState({});
  const today = new Date();

  // Default completed bookings
  const defaultCompletedBookings = [
    {
      id: 1,
      date: "2023-11-01",
      currentLocation: "Nairobi",
      newLocation: "Mombasa",
      mover: "Mover A",
      price: 150,
      status: "Completed",
    },
    {
      id: 2,
      date: "2023-10-20",
      currentLocation: "Kisumu",
      newLocation: "Eldoret",
      mover: "Mover B",
      price: 200,
      status: "Completed",
    },
  ];

  // Check for ongoing and upcoming bookings
  const isUpcoming = (date) => new Date(date) > today;
  const upcomingBookings =
    bookingDetails && isUpcoming(bookingDetails.date) ? [bookingDetails] : [];
  const ongoingBooking =
    bookingDetails && !isUpcoming(bookingDetails.date) ? bookingDetails : null;
  const hasBookings =
    bookingDetails !== null || defaultCompletedBookings.length > 0;

  const handleEditBooking = () => {
    // Implement logic to modify the ongoing booking
  };

  const handleRating = (bookingId, stars) => {
    setRating((prev) => ({
      ...prev,
      [bookingId]: stars,
    }));
  };

  return (
    <div className="my-booking">
      {hasBookings ? (
        <div className="dashboard-sections">
          {/* Completed Bookings Section */}
          <section className="section completed-bookings">
            <h3>Completed Bookings</h3>
            <table className="completed-bookings-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Mover</th>
                  <th>Price (Ksh)</th>
                  <th>Status</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {defaultCompletedBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.date}</td>
                    <td>{booking.currentLocation}</td>
                    <td>{booking.newLocation}</td>
                    <td>{booking.mover}</td>
                    <td>{booking.price}</td>
                    <td
                      className={`status-tag ${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </td>
                    <td>
                      {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          className={
                            rating[booking.id] > index ? "star filled" : "star"
                          }
                          onClick={() => handleRating(booking.id, index + 1)}
                        />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Ongoing Booking Section */}
          <section className="section ongoing-booking">
            <h3>Ongoing Booking</h3>
            {ongoingBooking ? (
              <div className="booking-card">
                <p>
                  <strong>Date:</strong> {ongoingBooking.date}
                </p>
                <p>
                  <strong>From:</strong> {ongoingBooking.currentLocation}
                </p>
                <p>
                  <strong>To:</strong> {ongoingBooking.newLocation}
                </p>
                <p>
                  <strong>Mover:</strong> {ongoingBooking.mover}
                </p>
                <p>
                  <strong>Price:</strong> ${ongoingBooking.price}
                </p>
                <p>
                  <strong>Time:</strong> 2:00 PM (Example Time)
                </p>
                <button className="edit-button" onClick={handleEditBooking}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Booking
                </button>
                <button className="call-button">
                  <FontAwesomeIcon icon={faPhoneAlt} /> Call Mover
                </button>
                <div className="progress-bar">
                  <div className="progress animated"></div>
                </div>
              </div>
            ) : (
              <p>No ongoing bookings.</p>
            )}
          </section>

          {/* Upcoming Bookings Section */}
          <section className="section upcoming-bookings">
            <h3>Upcoming Bookings</h3>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, index) => (
                <div key={index} className="booking-card">
                  <p>
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p>
                    <strong>From:</strong> {booking.currentLocation}
                  </p>
                  <p>
                    <strong>To:</strong> {booking.newLocation}
                  </p>
                  <p>
                    <strong>Mover:</strong> {booking.mover}
                  </p>
                  <p>
                    <strong>Price:</strong> Ksh{booking.price}
                  </p>
                  <p>
                    <strong>Time:</strong> 4:00 PM (Example Time)
                  </p>
                </div>
              ))
            ) : (
              <p>No upcoming bookings.</p>
            )}
          </section>

          {/* Booking Stats Section */}
          <section className="section booking-stats">
            <h3>Booking Stats</h3>
            <div className="stats-graph">
              <p>Graph Placeholder</p>
            </div>
          </section>

          {/* Map Section */}
          <section className="section map-section">
            <h3>Move Progress Map</h3>
            <MapContainer
              center={[-1.286389, 36.817223]}
              zoom={13}
              className="map-container"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[-1.286389, 36.817223]}>
                <Popup>Current Location: Nairobi</Popup>
              </Marker>
            </MapContainer>
          </section>
        </div>
      ) : (
        <p>Bookings will appear here.</p>
      )}
    </div>
  );
}

export default MyBooking;
