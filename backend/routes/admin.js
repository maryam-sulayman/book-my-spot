const express = require('express');
const { requireAuth, requireRole } = require('./auth');
const db = require('../database');

const router = express.Router();

// Admin-only route
router.get('/dashboard', requireAuth, requireRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
});

router.get('/owners-spots', requireAuth, requireRole('admin'), (req, res) => {
    const query = `
SELECT 
  users.id AS owner_id, 
  users.name AS owner_name, 
  users.email AS owner_email, 
  spots.id AS spot_id, 
  spots.address, 
  spots.latitude, 
  spots.longitude, 
  spots.price_per_hour
FROM users
LEFT JOIN spots ON users.id = spots.owner_id -- Use LEFT JOIN to include all owners
WHERE users.role = 'owner';



    `;
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching owners and spots:', err);
        return res.status(500).json({ message: 'Error fetching owners and spots', error: err });
      }
      console.log('Query Result:', result); 
      res.json(result);
    });
  });
  router.get('/drivers-bookings', requireAuth, requireRole('admin'), (req, res) => {
    const query = `
SELECT 
  bookings.id AS booking_id, 
  CONCAT(bookings.booking_date, ' ', bookings.start_time) AS start_time, 
  CONCAT(bookings.booking_date, ' ', bookings.end_time) AS end_time, 
  bookings.spot_id, 
  users.id AS driver_id, 
  users.name AS driver_name, 
  users.email AS driver_email, 
  spots.address, 
  spots.price_per_hour
FROM bookings
LEFT JOIN users ON bookings.user_id = users.id
LEFT JOIN spots ON bookings.spot_id = spots.id
WHERE users.role = 'driver';

    `;
  
    db.query(query, (err, result) => {
        if (err) {
          console.error('Error fetching drivers and bookings:', err);
          return res.status(500).json({ message: 'Error fetching drivers and bookings', error: err });
        }
        console.log('Drivers Bookings Query Result:', result); // Check the start_time and end_time formats
        res.json(result);
      });
      
  });
  router.delete('/delete-user/:userId', requireAuth, requireRole('admin'), (req, res) => {
    const { userId } = req.params;
  
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ message: 'Failed to delete user', error: err });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    });
  });
  module.exports = router;