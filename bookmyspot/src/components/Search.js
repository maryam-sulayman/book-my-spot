import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import '../styles/Search.css';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../components/Button'
import '../styles/Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


  return (
    <div className='search'>
      <h1 className='fw-bold title'>No More Parking Hassles, Just Spaces.</h1>
      <p className='subheading'>Find affordable parking nearby in real time</p>
      <form className='search-form'>
        <div className='search-container'>
        <input
          type="text"
          className='search-input'
          placeholder='Search for a place or postcode'
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
        <Button title='Find parking spots' customClass='button'/>
      </form>
    </div>
  );
};

export default Search;
