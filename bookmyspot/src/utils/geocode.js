// utils/geocode.js
import axios from 'axios';

export async function geocodeAddress(address) {
  try {
    // Log the geocoding query
    console.log('Geocoding address:', address);

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`
    );

    if (response.data.length === 0) {
      throw new Error('Address not found');
    }

    const { lat, lon, display_name } = response.data[0];
    console.log('Full Address:', display_name); // log the full address

    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  } catch (err) {
    console.error('Error geocoding address:', err);
    throw new Error('Unable to geocode the address. Please try again later.');
  }
}

