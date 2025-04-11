import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Reviews.css";

const LeaveReview = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    rating: "",
    comment: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting review for spot ID:", spotId); // Debug log
      const response = await axios.post(`/feedback/${spotId}/review`, {

        rating: review.rating,
        content: review.comment,
      });
      setMessage("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error.response?.data || error.message);
      setMessage("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="review-page-container  wrapper">
      <h2 className="review-title">Leave a Review</h2>
      {message && <p className="review-message">{message}</p>}
      <form className="review-form " onSubmit={handleSubmit}>
        <label className="review-label">Rating (1-5):</label>
        <input
          type="number"
          name="rating"
          value={review.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className="review-input"
          required
        />
        <label className="review-label">Comment:</label>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
          className="review-textarea"
          required
        ></textarea>
        <div className="review-buttons">
          <button
            type="button"
            className="review-button cancel-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="review-button submit-button">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveReview;
