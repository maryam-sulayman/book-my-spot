const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/geocode', async (req, res) => {
    const { address } = req.query;
    console.log(`Received address: ${address}`); // Log the incoming address
  
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });
  
      console.log('Google Maps API Response:', response.data); // Log the API response
      res.json(response.data);
    } catch (err) {
      console.error('Error fetching geocode data:', err.message);
      res.status(500).json({ message: 'Failed to fetch geocode data' });
    }
  });
  

module.exports = router;
