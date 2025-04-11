// StepProgress.jsx
import React from "react";
import "../styles/Steps.css";

const StepProgress = ({ currentStep }) => {
  return (
    <div className="step-progress-container d-flex justify-content-center mt-5 mb-3">
      <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
        <div className="circle">1</div>
        <p className="text">Booking Details</p>
      </div>
      <div className={`line ${currentStep >= 2 ? "active" : ""}`}></div>
      <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
        <div className="circle">2</div>
        <p className="text">Personal Information</p>
      </div>
      <div className={`line ${currentStep >= 3 ? "active" : ""}`}></div>
      <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
        <div className="circle">3</div>
        <p className="text">Payment</p>
      </div>
    </div>
  );
};

export default StepProgress;
