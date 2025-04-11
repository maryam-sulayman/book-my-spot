const express = require("express");
const db = require("../database");
const { requireAuth } = require("./auth");

const router = express.Router();

router.post("/:spotId/review", requireAuth, (req, res) => {
    const { spotId } = req.params; // spotId from the request
    const { rating, content } = req.body; // Review data
    const userId = req.user.id; // Authenticated user's ID
  
    if (!rating || !content) {
      return res.status(400).json({ message: "Rating and content are required." });
    }
  
    // Check if the spotId exists in the spot_availability table
    const validateSpotQuery = "SELECT spot_id FROM spot_availability WHERE id = ?";
    db.query(validateSpotQuery, [spotId], (err, results) => {
      if (err) {
        console.error("Error validating spot:", err);
        return res.status(500).json({ message: "Error validating spot.", error: err });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "Spot not found in availability." });
      }
  
      // Proceed with inserting the review
      const insertReviewQuery = `
        INSERT INTO feedback (spot_id, user_id, rating, content)
        VALUES (?, ?, ?, ?)
      `;
      const values = [results[0].spot_id, userId, rating, content];
  
      db.query(insertReviewQuery, values, (err, result) => {
        if (err) {
          console.error("Error submitting review:", err);
          return res.status(500).json({ message: "Failed to submit review.", error: err });
        }
        res.status(201).json({ message: "Review submitted successfully." });
      });
    });
  });
  
  

module.exports = router;
