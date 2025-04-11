import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Button from "../components/Button";
import "../styles/BookingDetails.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StepProgress from "../components/Steps";

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    spotId,
    address = "No address provided",
    lat = 51.5074,
    lng = -0.1278,
    price_per_hour = "N/A",
    date = "N/A",
    startTime = "N/A",
    endTime = "N/A",
  } = location.state || {};

  const handleProceed = () => {
    if (!spotId || !address || !lat || !lng || !price_per_hour || !date || !startTime || !endTime) {
      alert("Booking details are incomplete. Please go back and fill in the required fields.");
      return;
    }
    const bookingDate = new Date(startTime).toISOString().split("T")[0]; 
    console.log("Details Passed to AdditionalInfo:", {
        spotId,
        address,
        lat,
        lng,
        price_per_hour,
        bookingDate,
        startTime,
        endTime,
      });
    navigate("/additional-info", {
      state: {
        spotId,
        address,
        lat,
        lng,
        price_per_hour,
        bookingDate, 
        startTime,
        endTime,
      },
    });
  };
  
  

  const handleCancel = () => {
    navigate("/available-spots");
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };
  return (
      <div className="wrapper">
    <StepProgress currentStep={1} />
      <h2 className="text-center title my-3">Your Booking Details</h2>
      <div className="additional-info-container">
        <div>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "300px" }}
            zoom={14}
            center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          >
            <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
          </GoogleMap>
        </div>
        <div className="second">
          <h3 className="mt-4 subtitle mb-4">Details for <span className="address"> {address}</span></h3>
          <div className='details'>
          <p> <span><FontAwesomeIcon icon="walking" className='walking-icon'/> Time to destination:</span><span>15 mins</span> </p>
          <p>Date: <span>{formatDate(date)}</span></p>
          <p>Time From: <span>{formatTime(startTime)}</span></p>
          <p>Until: <span>{formatTime(endTime)}</span> </p>
          <p>Price: <span>£{price_per_hour}p/hour</span></p>
          </div>
          <div className="d-flex justify-content-between p-3">
            <Button
              title="Cancel"
              customClass="cancel"
              handleClick={handleCancel}
            />
            <Button
              title="Next"
              customClass="next"
              handleClick={handleProceed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
