import React, { useState, useEffect } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { GoogleMap, Marker } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/AvailableSpots.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const libraries = ["places"];

export default function AvailableSpots() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [spots, setSpots] = useState([]);
  const [center, setCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [autocomplete, setAutocomplete] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [loadingRole, setLoadingRole] = useState(true);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("/auth/profile", { withCredentials: true });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("");
      } finally {
        setLoadingRole(false);
      }
    };

    fetchUserRole();
  }, []);

  const fetchSpots = async ({ address }) => {
    try {
      const response = await axios.get("http://localhost:4000/spots/search", {
        params: { address },
      });

      if (response.data && response.data.length > 0) {
        const spotsWithRatings = response.data.map((spot) => ({
          ...spot,
          rating: Math.floor(Math.random() * 4) + 2, // Random rating between 2 and 5
        }));
        setSpots(spotsWithRatings);
      } else {
        setSpots([]);
      }
    } catch (error) {
      console.error("Error fetching spots:", error);
      setSpots([]);
    }
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const { lat, lng } = place.geometry.location;
        setAddress(place.formatted_address);
        setCenter({ lat: lat(), lng: lng() });
      }
    }
  };

  const handleSearch = () => {
    if (!address || !startTime || !endTime) {
      alert("Please input all fields");
      return;
    }

    fetchSpots({ address });
  };

  const handleBookNow = (spot) => {
    if (!startTime || !endTime) {
      alert("Please select a valid start and end time before booking.");
      return;
    }

    if (userRole !== "driver") {
      alert("Only drivers who have an account can proceed with bookings, Redirecting to homepage...");
      navigate("/"); // Redirect to homepage
      return;
    }

    navigate("/booking-details", {
      state: {
        spotId: spot.id,
        address: spot.address,
        lat: spot.lat,
        lng: spot.lng,
        price_per_hour: spot.price_per_hour,
        date: startTime.toISOString().split("T")[0],
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    });
  };

  if (!isLoaded || loadingRole) return <p>Loading...</p>;

  return (
    <div className="available-spots-container">
      {/* Search Form */}
      <div className="available-search-container">
        <div>
          <label>Search</label>
          <Autocomplete
            onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter postcode or address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="available-search-input"
            />
          </Autocomplete>
        </div>

        <div>
          <label>Start Time:</label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            dateFormat="Pp"
            className="available-input"
          />
        </div>
        <div>
          <label>End Time:</label>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            dateFormat="Pp"
            className="available-input"
          />
        </div>
        <Button title="Search" handleClick={handleSearch} customClass="available-search-button " />
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        zoom={14}
        center={center}
      >
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={{ lat: parseFloat(spot.lat), lng: parseFloat(spot.lng) }}
          />
        ))}
      </GoogleMap>

      <h3 className="my-4">Parking Near you</h3>
      <div className="available-spots-list">
        {spots.map((spot) => (
          <div key={spot.id} className="available-spot-card">
            <img
              className="available-spot-image"
              src={
                spot.image_url
                  ? `http://localhost:4000${spot.image_url}`
                  : "placeholder-image.png"
              }
              alt={spot.address}
              onError={(e) => (e.target.src = "placeholder-image.png")}
            />
            <div className="available-spot-details">
              <h3 className="available-spot-address">{spot.address.split(",")[0]}</h3>
              <div className="space">
                <p className="available-spot-postcode">{spot.address.split(",")[2]}</p>
                <div className="available-spot-rating">
                  {[...Array(Math.max(0, Math.round(spot.rating)))].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="available-star-icon" />
                  ))}
                  <span> ({Math.round(spot.rating)})</span>
                </div>
              </div>
              <div className="space">
                <p className="available-spot-price">Price p/h:</p> <span>£{spot.price_per_hour}</span>
              </div>
              <div className="space">
                <p className="available-spot-availability">Availability: </p>
                <span
                  className={`availability-status ${
                    spot.is_available ? "available" : "not-available"
                  }`}
                >
                  {spot.is_available ? "Yes" : "No"}
                </span>
              </div>

              <Button
                title={spot.is_available ? "Book Now" : "Book Later"}
                handleClick={() => handleBookNow(spot)}
                customClass="available-spot-button"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
