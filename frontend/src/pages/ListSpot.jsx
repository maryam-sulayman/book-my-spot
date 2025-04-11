import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Spots.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

export default function Spots() {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    postcode: "",
    pricePerHour: "",
    images: [],
    availability: [],
  });

  const [availability, setAvailability] = useState({
    date: null,
    startTime: "",
    endTime: "",
  });

  const [listedSpots, setListedSpots] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchListedSpots();
  }, []);

  const fetchListedSpots = async () => {
    try {
      const response = await axios.get("/spots/my-spots", {
        withCredentials: true,
      });
      setListedSpots(response.data);
    } catch (err) {
      console.error("Error fetching spots:", err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this spot?");
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`/spots/${id}`, { withCredentials: true });
      // Refresh spots after deletion
      setListedSpots(listedSpots.filter((spot) => spot.id !== id));
    } catch (err) {
      console.error("Error deleting spot:", err.response?.data || err.message);
      alert("Failed to delete the spot. Please try again.");
    }
  };
  

  const addAvailability = () => {
    if (
      !availability.date ||
      !availability.startTime ||
      !availability.endTime
    ) {
      setError("Please provide complete availability details.");
      return;
    }

    const formattedDate = format(availability.date, "yyyy-MM-dd");

    setFormData((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        {
          date: formattedDate,
          startTime: availability.startTime,
          endTime: availability.endTime,
        },
      ],
    }));

    setAvailability({ date: null, startTime: "", endTime: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { street, city, postcode, pricePerHour, images, availability } =
      formData;

    if (availability.length === 0) {
      setError("Please add availability before listing the spot.");
      setLoading(false);
      return;
    }

    try {
      const fullAddress = `${street}, ${city}, ${postcode}`;
      const geoResponse = await axios.get("/api/geocode", {
        params: { address: fullAddress },
      });

      if (geoResponse.data.status === "OK") {
        const { lat, lng } = geoResponse.data.results[0].geometry.location;

        const formDataToSend = new FormData();
        formDataToSend.append("address", fullAddress);
        formDataToSend.append("pricePerHour", pricePerHour);
        formDataToSend.append("lat", lat);
        formDataToSend.append("lng", lng);
        formDataToSend.append("availability", JSON.stringify(availability));
        images.forEach((image) => formDataToSend.append("images", image));

        await axios.post("/spots", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        fetchListedSpots();
        setFormData({
          street: "",
          city: "",
          postcode: "",
          pricePerHour: "",
          images: [],
          availability: [],
        });
      } else {
        setError(
          "Unable to fetch coordinates for the given address. Please check the address."
        );
      }
    } catch (err) {
      console.error("Error creating spot:", err.response?.data || err.message);
      setError("Failed to list the spot. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="spots-container">
      <div className="list-container">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="mb-3">
            <label htmlFor="street">Street Name</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="postcode">Postcode</label>
            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pricePerHour">Price Per Hour (£)</label>
            <div className="price-container">
              <input
                type="number"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleChange}
                required
                min="0"
                className="form-control price-input"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="images">Upload an Image</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleChange}
              multiple
              className="form-control mt-1"
            />
          </div>
          <div className="mb-3">
              <label htmlFor="availability-date">Set Availability</label>
            <div className="availability-picker">
              <DatePicker
                selected={availability.date}
                onChange={(date) =>
                  setAvailability((prev) => ({ ...prev, date }))
                }
                placeholderText="Select Date"
                className="form-control"
              />
<div className="time-picker-container"> <div className="time-picker-wrapper">
                <label>From:</label>
                <input
                  type="time"
                  className="custom-time-picker"
                  onChange={(e) =>
                    setAvailability((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  value={availability.startTime}
                />
              </div>

              <div className="time-picker-wrapper">
                <label>Until:</label>
                <input
                  type="time"
                  className="custom-time-picker"
                  onChange={(e) =>
                    setAvailability((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                  value={availability.endTime}
                />
              </div></div>
             

              <Button
                type="button"
                title="+"
                handleClick={addAvailability}
                customClass="mt-2 add-button"
              />
            
            </div>
          </div>
  
          <Button
            type="submit"
            disabled={loading}
            title={loading ? "Listing..." : "List Spot"}
            customClass="add-spot-button"
          />
        </form>
      </div>

      {/* Listed Spots */}
      <div className="listed-spots-container">
        <h2>Your Listed Spots</h2>
        {listedSpots.length === 0 ? (
          <p>No spots listed yet.</p>
        ) : (
          <div className="listed-spots-grid">
            {listedSpots.map((spot, index) => (
              <div key={index} className="spot-card">
                <div>
                  <img
                    className="spot-image"
                    src={
                      spot.images.length > 0
                        ? `http://localhost:4000${spot.images[0]}`
                        : "placeholder-image.png"
                    }
                    alt={`Spot ${index}`}
                  />
                </div>

                <div className="spot-details">
                  <h3 className="label">
                    Address: <span className="info">{spot.address}</span>
                  </h3>
                  <p className="label">
                    Price per hour:{" "}
                    <span className="info"> £{spot.pricePerHour}</span>
                  </p>
                  <p className="label">
                    Available:
                    <span className="info">
                      {" "}
                      {spot.availability.length > 0 ? "Yes" : "No"}
                    </span>
                  </p>
                  <div className="spot-actions">
  <p className="edit">
    Edit{" "}
    <FontAwesomeIcon
      icon="edit"
      className="edit-icon"
      title="Edit Spot"
    />
  </p>
  <p className="delete">
    Delete{" "}
    <FontAwesomeIcon
      icon="trash"
      className="delete-icon"
      title="Delete Spot"
      onClick={() => handleDelete(spot.id)}
    />
  </p>
</div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
