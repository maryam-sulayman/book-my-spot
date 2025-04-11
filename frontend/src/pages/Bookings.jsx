import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Bookings.css";
import Button from '../components/Button'

const Bookings = ({ userRole }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bookings/my-bookings", {
          withCredentials: true,
        });
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err.message);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleLeaveReview = (spotId) => {
    navigate(`/spots/${spotId}/review`);
  };

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bookings-container">
      {userRole === "driver" && (
        <>
          <h3>Your Booked Spots</h3>
          {bookings.length > 0 ? (
            <ul className="bookings-list">
              {bookings.map((booking) => (
                <li key={booking.booking_id} className="booking-item">
                  <p>
                    <strong>Address:</strong> {booking.address}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.start_time} - {booking.end_time}
                  </p>
                  <p>
                    <strong>Total Price:</strong> 
                    £{!isNaN(parseFloat(booking.total_price)) ? parseFloat(booking.total_price).toFixed(2) : "N/A"}
                  </p>
                  <Button
                    title="Leave a Review"
                    className="leave-review-button"
                    handleClick={() => handleLeaveReview(booking.booking_id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no bookings yet.</p>
          )}
        </>
      )}

      {userRole === "owner" && (
        <>
          <h3>Bookings for Your Spots</h3>
          {bookings.length > 0 ? (
            <ul className="bookings-list">
              {bookings.map((booking) => (
                <li key={booking.booking_id} className="booking-item">
                  <p>
                    <strong>Address:</strong> {booking.address}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.start_time} - {booking.end_time}
                  </p>
                  <p>
                    <strong>Total Price:</strong> 
                    £{!isNaN(parseFloat(booking.total_price)) ? parseFloat(booking.total_price).toFixed(2) : "N/A"}
                  </p>
                  <p>
                    <strong>Driver Name:</strong> {booking.driver_name || "N/A"}
                  </p>
                  <p>
                    <strong>Driver Email:</strong> {booking.driver_email || "N/A"}
                  </p>

                  <Button
                    title="Contact Driver"
                    customClass="contact-driver-button"
                    handleClick={() => window.location.href = `mailto:${booking.driver_email}`}
                  />
               
                 
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings have been made for your spots yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Bookings;
