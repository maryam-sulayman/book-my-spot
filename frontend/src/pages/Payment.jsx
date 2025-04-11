import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import "../styles/Payment.css";
import StepProgress from "../components/Steps";
import payment from "../images/payment.png";
import axios from "axios";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    spotId,
    bookingDate,
    startTime,
    endTime,
    price_per_hour,
  } = location.state || {};

  const [cardholderName, setCardholderName] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const totalHours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
  const totalPrice = Math.round(parseFloat(price_per_hour) * totalHours * 100);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not loaded yet. Please try again later.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/payments/create-payment-intent",
        { amount: totalPrice, currency: "usd" },
        { withCredentials: true }
      );

      const clientSecret = response.data.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: cardholderName,
          },
        },
      });

      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful! Booking Confirmed.");
        navigate("/account/bookings");
      }
    } catch (error) {
      console.error("Error processing payment:", error.response?.data || error.message);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <StepProgress currentStep={3} />
      <div className="payment my-">
        <h2 className="mb-0 title">Checkout Securely</h2>
  
      </div>
      <div className="additional-info-container">
      <img src={payment} className="img-fluid payment-image" alt="Payment" />
        <form onSubmit={handlePayment} className="form-group">
          <label>Cardholder Name</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control input"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>

          <label>Card Number</label>
          <div className="position-relative">
            <CardNumberElement className="form-control input py-3" />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          </div>

          <label>Expiration Date</label>
          <div className="position-relative">
            <CardExpiryElement className="form-control input py-3" />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          </div>

          <label>CVV</label>
          <div className="position-relative">
            <CardCvcElement className="form-control input py-3" />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          </div>

          <div className="d-flex justify-content-between mt-5 px-3">
            <Button
              title="Previous"
              customClass="previous"
              handleClick={() => navigate(-1)}
            />
            <Button
              title="Confirm Pay"
              customClass="pay"
              disabled={!stripe}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
