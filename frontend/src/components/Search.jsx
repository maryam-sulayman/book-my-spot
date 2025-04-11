import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Search.css';
import Button from '../components/Button'

const libraries = ['places'];

export default function Search() {
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) return <p>Loading...</p>;

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    setAddress(place?.formatted_address || '');
  };

  const handleSearch = () => {
    if (!address || !startDate || !endDate) {
      alert('Please select a location, check-in, and check-out times.');
      return;
    }

    navigate('/available-spots', {
      state: {
        address,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        promoCode,
      },
    });
  };

  return (
    <div className="search-component">
      <h2 className="search-title">Book Now</h2>
      <div className="search-form">
        {/* Location Input */}
        <div className="search-field">
          <label className="field-label">Select Location</label>
          <Autocomplete
            onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter address"
              className="input-box search-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Autocomplete>
        </div>

        {/* Check-In */}
        <div className="search-field">
          <label className="field-label">From:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="input-box"
          />
        </div>

        {/* Check-Out */}
        <div className="search-field">
          <label className="field-label">Until:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="input-box"
          />
        </div>

        {/* Promo Code */}
        <div className="search-field">
          <label className="field-label">Promo Code <span className='italic'>(Optional)</span></label>
          <input
            type="text"
            placeholder="Enter promo code"
            className="input-box promo"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <Button title= 'Search' customClass="search-button" handleClick={handleSearch}/>

      </div>
    </div>
  );
}
