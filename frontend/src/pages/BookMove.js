import React, { useState, useContext } from "react";
import { BookingContext } from "../context/BookingContext"; // Import BookingContext
import ReusableCard from "../components/Card";
import ReusableButton from "../components/Button";
import Payment from "./Payment"; // Import the Payment component

function BookMove() {
  const { setBookingDetails } = useContext(BookingContext);

  // State variables
  const [currentLocation, setCurrentLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [locations] = useState([
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Eldoret",
    "Nakuru",
    "Malindi",
    "Kisii",
    "Thika",
    "Meru",
    "Naivasha",
  ]); // Random locations to choose from
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [quote, setQuote] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [movers, setMovers] = useState([]);
  const [selectedMover, setSelectedMover] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal visibility for payment
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Sample inventory options
  const inventoryOptions = [
    "Bedsitter",
    "One Bedroom",
    "Studio",
    "Two Bedroom",
  ];

  // Handler for inventory selection
  const handleInventorySelect = (item) => {
    setSelectedInventory((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Handler to calculate the quote based on selected inventory
  const calculateQuote = () => {
    const basePrice = 50; // base price per item
    const totalPrice = selectedInventory.length * basePrice;
    setQuote(totalPrice); // Set the calculated quote
    setShowModal(true); // Show the payment modal once the quote is calculated
  };

  // Handler to simulate fetching movers with their prices
  const fetchMovers = () => {
    const availableMovers = [
      { name: "Mover 1", price: 100 },
      { name: "Mover 2", price: 150 },
      { name: "Mover 3", price: 120 },
    ];
    setMovers(availableMovers); // Set available movers
  };

  // Handler to book the move
  const handleBooking = () => {
    const bookingData = {
      currentLocation,
      newLocation,
      selectedInventory,
      date: bookingDate,
      time: bookingTime,
      price: quote,
      mover: selectedMover ? selectedMover.name : "No mover selected",
    };

    // Store booking details in context (simulating a backend call)
    setBookingDetails(bookingData);

    // Simulate a successful booking
    alert("Move booked successfully!");
  };

  // Handle Step Change
  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      setProgress((currentStep / 5) * 100); // Set progress based on steps
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgress(((currentStep - 2) / 5) * 100); // Set progress based on steps
    }
  };

  return (
    <div className="book-move">
      <h2>Book Your Move</h2>

      <ReusableCard>
        {/* Progress Bar */}
        <div className="progress-bar" style={{ marginBottom: "20px" }}>
          <div
            className="progress"
            style={{
              width: `${progress}%`,
              height: "5px",
              backgroundColor: "#4caf50",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>

        {/* Step Navigation */}
        {currentStep === 1 && (
          <div className="step">
            <h4>Step 1: Select Your Locations</h4>
            <div className="location-details">
              <h5>Current Location</h5>
              <select
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
              >
                <option value="">Select Current Location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <h5>New Location</h5>
              <select
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              >
                <option value="">Select New Location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step">
            <h4>Step 2: Select Your Inventory</h4>
            {inventoryOptions.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={selectedInventory.includes(item)}
                  onChange={() => handleInventorySelect(item)}
                />
                {item}
              </label>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="step">
            <h4>Step 3: Choose Date and Time</h4>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="step">
            <h4>Step 4: Choose a Mover</h4>
            <div>
              {movers.map((mover) => (
                <label key={mover.name}>
                  <input
                    type="radio"
                    name="mover"
                    value={mover.name}
                    onChange={() => setSelectedMover(mover)}
                  />
                  {mover.name} - ${mover.price}
                </label>
              ))}
            </div>
            <ReusableButton onClick={fetchMovers}>Fetch Movers</ReusableButton>
          </div>
        )}

        {currentStep === 5 && (
          <div className="step">
            <h4>Step 5: Calculate Your Quote</h4>
            <ReusableButton onClick={calculateQuote}>
              Get Your Price
            </ReusableButton>
            {quote !== null && <p>Estimated Quote: ${quote}</p>}
          </div>
        )}

        {currentStep === 6 && (
          <div className="step">
            <h4>Step 6: Finalize Your Booking</h4>
            <ReusableButton onClick={handleBooking}>Book Move</ReusableButton>
          </div>
        )}

        {/* Step Navigation Buttons */}
        <div className="step-navigation">
          {currentStep > 1 && (
            <ReusableButton onClick={handlePrevStep}>Back</ReusableButton>
          )}
          {currentStep < 6 && (
            <ReusableButton onClick={handleNextStep}>Next</ReusableButton>
          )}
        </div>
      </ReusableCard>

      {/* Checkout Modal */}
      {showModal && (
        <Payment
          currentLocation={currentLocation}
          newLocation={newLocation}
          selectedInventory={selectedInventory}
          price={quote}
          onPaymentSuccess={() => {
            setPaymentSuccess(true);
            setTimeout(() => {
              setShowModal(false);
              setPaymentSuccess(false);
              handleNextStep(); // Move to the next step
            }, 2000);
          }}
        />
      )}
    </div>
  );
}

export default BookMove;
