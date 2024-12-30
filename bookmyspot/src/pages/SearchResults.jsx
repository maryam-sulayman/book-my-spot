import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../components/Button'
import '../styles/Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function SearchResults() {
    const location = useLocation();
    const { lat, lng } = location.state || {}; 
    const [markers, setMarkers] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        if (lat && lng) {
            fetchParkingSpots(lat, lng);
        }
    }, [lat, lng]);

    const fetchParkingSpots = async (lat, lng) => {
        try {
            const response = await axios.get('/parking-spots', {
                params: { lat, lng, startDate, endDate },
            });
            // Process spots as before
        } catch (error) {
            console.error('Error fetching parking spots:', error);
        }
    };
    
    const handleNewSearch = async () => {
        try {
            const geoResponse = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        address: searchLocation,
                        key: 'YOUR_GOOGLE_MAPS_API_KEY',
                    },
                }
            );
    
            const { lat, lng } = geoResponse.data.results[0].geometry.location;
            fetchParkingSpots(lat, lng);
        } catch (error) {
            console.error('Error fetching new parking spots:', error);
        }
    };

    return (
        <div>
             <form className='search-form'>
        <div className='search-container'>
        <input
        type="text"
        className="search-input"
        placeholder="Search for a place or postcode"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)} 
        />
        <FontAwesomeIcon icon="location-arrow" className='location-icon'  />
        </div>
        <div className='date mt-4'>
          <div className='date-container'> 
            <label htmlFor="from">From:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className='date-input'
              placeholderText="Select start date"
            />
          </div>
          <div className='date-container'>
          <label htmlFor="from">Until:</label>
          <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className='date-input'
              placeholderText="Select end date"
            />
          </div>
        </div>
        <Button title='Find parking spots' customClass='button' handleClick={handleNewSearch}/>
      </form>
            <h1>Parking Spots Near You</h1>
            <MapComponent markers={markers} />
        </div>
    );
}
