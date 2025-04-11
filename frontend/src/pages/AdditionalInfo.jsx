import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import "../styles/AdditionalInfo.css";
import StepProgress from "../components/Steps";

const AdditionalInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    carRegistration: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!state || !state.bookingDate) {
      alert("Please go back and complete the previous steps.");
      return;
    }
    console.log("Details Passed to Payment:", {
        ...state,
        userInfo,
      });
    navigate("/payment", {
      state: {
        ...state,
        userInfo,
      },
    });
  };
  
  

  return (
    <div className="wrapper">
        <StepProgress currentStep={2} />
      <h2 className="text-center my-3 title">Personal Information</h2>
      <div className="additional-info-container">
      <form className="form-group" >
        <label>Name</label>
        <input
          type="text"
          className="form-control input"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          className="form-control input"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          required
        />
        <label>Phone</label>
        <input
          type="text"
          className="form-control input"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          required
        />
        <label>Car Registration Number</label>
        <input
          type="text"
          className="form-control input"
          name="carRegistration"
          value={userInfo.carRegistration}
          onChange={handleChange}
          required
        />
        <label>Anything you would like us to know?</label>
        <textarea
          className="form-control input"
          name="additionalInfo"
          value={userInfo.additionalInfo}
          onChange={handleChange}
        />
      </form>
      <div className="d-flex justify-content-between my-3 px-3">
        <Button
          title="Previous"
          customClass="previous"
          handleClick={() => navigate(-1)}
        />
        <Button
          title="Next"
          customClass="next"
          handleClick={handleNext}
        />
      </div>
      </div>
     
    </div>
  );
};

export default AdditionalInfo;
