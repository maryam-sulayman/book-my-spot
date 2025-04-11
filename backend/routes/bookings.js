const express = require('express');
const db = require('../database');
const { requireAuth } = require('./auth');

const router = express.Router();

router.post('/', requireAuth, (req, res) => {
  const { spotId, bookingDate, startTime, endTime, totalPrice } = req.body;
  const userId = req.user.id;

  if (!spotId || !bookingDate || !startTime || !endTime || isNaN(totalPrice) || totalPrice <= 0) {
    console.error("Invalid booking data:", { spotId, bookingDate, startTime, endTime, totalPrice });
    return res.status(400).json({ message: 'Invalid price or time data.' });
  }

  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Only drivers can book spots.' });
  }

  const formatMySQLDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };

  const formattedStartTime = formatMySQLDateTime(startTime);
  const formattedEndTime = formatMySQLDateTime(endTime);

  const duration = Math.abs(new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);

  const bookingQuery = `
    INSERT INTO bookings (user_id, spot_id, booking_date, start_time, end_time, total_price, duration)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [userId, spotId, bookingDate, formattedStartTime, formattedEndTime, totalPrice, duration];

  db.query(bookingQuery, values, (err, result) => {
    if (err) {
      console.error('Error creating booking:', err);
      return res.status(500).json({ message: 'Failed to create booking.', error: err });
    }
    res.status(201).json({ message: 'Booking created successfully', bookingId: result.insertId, totalPrice });
  });
});





router.get('/my-bookings', requireAuth, (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role; // Role from auth middleware (e.g., 'driver', 'owner', 'admin')

  let query = "";
  let values = [];

  if (userRole === 'driver') {
    // Query for driver bookings
    query = `
      SELECT 
        b.id AS booking_id, 
        s.address, 
        b.booking_date, 
        b.start_time, 
        b.end_time, 
        b.total_price
      FROM bookings b
      JOIN spots s ON b.spot_id = s.id
      WHERE b.user_id = ?;
    `;
    values = [userId];

  } else if (userRole === 'owner') {
    query = `
      SELECT 
        b.id AS booking_id, 
        s.address, 
        b.booking_date, 
        b.start_time, 
        b.end_time, 
        b.total_price, 
        u.name AS driver_name, 
        u.email AS driver_email
      FROM bookings b
      JOIN spots s ON b.spot_id = s.id
      JOIN users u ON b.user_id = u.id
      WHERE s.owner_id = ?;
    `;
    values = [userId];
  

  } else if (userRole === 'admin') {
    // Query for all bookings (admin view)
    query = `
      SELECT 
        b.id AS booking_id, 
        s.address, 
        b.booking_date, 
        b.start_time, 
        b.end_time, 
        b.total_price, 
        u.name AS booked_by
      FROM bookings b
      JOIN spots s ON b.spot_id = s.id
      JOIN users u ON b.user_id = u.id;
    `;
    // No specific filtering needed for admin
  } else {
    // Unauthorized role
    return res.status(403).json({ message: 'Unauthorized: Unknown role' });
  }

  // Execute the query
  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Failed to fetch bookings', error: err });
    }

    res.status(200).json(results); // Return results
  });
});

  
module.exports = router;
