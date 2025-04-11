const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');
const { requireAuth, requireRole } = require('./auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post('/', requireAuth, requireRole('owner'), upload.array('images', 5), (req, res) => {
  const { address, pricePerHour, lat, lng, availability } = req.body;
  const ownerId = req.user?.id;

  if (!ownerId || !address || !pricePerHour || !lat || !lng) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
  const spotQuery = 'INSERT INTO spots (owner_id, address, latitude, longitude, images, price_per_hour) VALUES (?, ?, ?, ?, ?, ?)';
  const spotValues = [ownerId, address, lat, lng, JSON.stringify(imagePaths), pricePerHour];

  db.query(spotQuery, spotValues, (err, result) => {
    if (err) {
      console.error('Error creating spot:', err);
      return res.status(500).json({ message: 'Failed to create spot', error: err });
    }

    const spotId = result.insertId;
    const availabilityData = JSON.parse(availability);
    const availabilityQuery = `
      INSERT INTO spot_availability (spot_id, date, start_time, end_time, is_available) 
      VALUES ?
    `;
    const availabilityValues = availabilityData.map((slot) => [
      spotId,
      new Date(slot.date).toISOString().split('T')[0],
      slot.startTime,
      slot.endTime,
      true,
    ]);

    db.query(availabilityQuery, [availabilityValues], (err) => {
      if (err) {
        console.error('Error saving availability:', err);
        return res.status(500).json({ message: 'Failed to save availability', error: err });
      }

      res.status(201).json({ message: 'Spot and availability created successfully', spotId });
    });
  });
});


router.get('/my-spots', requireAuth, (req, res) => {
  const ownerId = req.user.id;

  const query = `
    SELECT s.*, sa.date, sa.start_time, sa.end_time
    FROM spots s
    LEFT JOIN spot_availability sa ON s.id = sa.spot_id
    WHERE s.owner_id = ?
  `;

  db.query(query, [ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching spots:', err);
      return res.status(500).json({ message: 'Failed to fetch spots', error: err });
    }

    const spots = results.reduce((acc, curr) => {
      const existingSpot = acc.find((spot) => spot.id === curr.id);
      const images = JSON.parse(curr.images || '[]'); // Parse images JSON

      if (existingSpot) {
        // Append availability to the existing spot
        existingSpot.availability.push({
          date: curr.date,
          startTime: curr.start_time,
          endTime: curr.end_time,
        });
      } else {
        // Add a new spot
        acc.push({
          id: curr.id,
          address: curr.address,
          pricePerHour: curr.price_per_hour,
          images, // Parsed images array
          image_url: images.length > 0 ? images[0] : null, // Use the first image or null
          availability: curr.date
            ? [
                {
                  date: curr.date,
                  startTime: curr.start_time,
                  endTime: curr.end_time,
                },
              ]
            : [],
        });
      }
      return acc;
    }, []);

    res.status(200).json(spots);
  });
});

router.get('/search', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ message: 'Missing required parameter: address.' });
  }

  const query = `
    SELECT s.*, sa.is_available
    FROM spots s
    LEFT JOIN spot_availability sa ON s.id = sa.spot_id
    WHERE (LOWER(s.address) LIKE ? OR LOWER(s.address) LIKE ?)
  `;
  const values = [`%${address.toLowerCase()}%`, `%${address.split(",")[0].toLowerCase()}%`];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error fetching spots:', err);
      return res.status(500).json({ message: 'Failed to fetch spots.' });
    }

    console.log('Search Results:', results); // Add debugging log

    const spots = results.map((spot) => ({
      ...spot,
      images: JSON.parse(spot.images || '[]'), // Parse images JSON
      image_url: spot.images ? JSON.parse(spot.images)[0] : null, // Use the first image
      is_available: spot.is_available || false, // Ensure availability status is set
    }));

    res.status(200).json(spots);
  });
});
router.delete('/:id', requireAuth, requireRole('owner'), (req, res) => {
  const spotId = req.params.id;
  const ownerId = req.user.id;

  const deleteSpotQuery = `
    DELETE FROM spots 
    WHERE id = ? AND owner_id = ?
  `;

  db.query(deleteSpotQuery, [spotId, ownerId], (err, result) => {
    if (err) {
      console.error('Error deleting spot:', err);
      return res.status(500).json({ message: 'Failed to delete spot', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Spot not found or not authorized to delete' });
    }

    res.status(200).json({ message: 'Spot deleted successfully' });
  });
});


module.exports = router;
