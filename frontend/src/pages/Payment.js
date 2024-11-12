import React from "react";
import "./Payment.css";

function Payment({
  currentLocation,
  newLocation,
  selectedInventory,
  price,
  onPaymentSuccess,
}) {
  const handlePayment = () => {
    onPaymentSuccess();
  };

  return (
    <div className="payment-modal">
      <h3>Payment Details</h3>
      <p>From: {currentLocation}</p>
      <p>To: {newLocation}</p>
      <p>Inventory: {selectedInventory.join(", ")}</p>
      <p>Total Price: ${price}</p>

      <button onClick={handlePayment}>Pay with Card</button>
      <button onClick={handlePayment}>Pay with M-Pesa</button>
    </div>
  );
}

export default Payment;
