import React, { useState } from 'react';
import axios from 'axios';
import ListedSpots from '../components/ListedSpots';
import '../styles/Spots.css'
import Button from '../components/Button';

export default function Bookings() {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    postcode: '',
    price: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const { street, city, postcode, price, image } = formData;
  
    try {
      const fullAddress = `${street}, ${city}, ${postcode}`;
      const formDataToSend = new FormData();
      formDataToSend.append('address', fullAddress);
      formDataToSend.append('pricePerHour', price);
      if (image) formDataToSend.append('image', image);
  
      const response = await axios.post('/spots', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
  
      console.log('Spot created:', response.data);
      setFormData({
        street: '',
        city: '',
        postcode: '',
        price: '',
        image: null,
      });
    } catch (err) {
      console.error('Error creating spot:', err.response?.data || err.message);
      setError('Failed to list the spot. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className='spots-container'>
      <div className='list-container'>
      <h1 className='spots-container__title mb-4'>List a new parking spot</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} >
        <div className='mb-3'>
        <label htmlFor="password">Street name</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
          className='form-control'

        />
        </div>
     <div className='mb-3'>
     <label htmlFor="password">City</label>
     <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className='form-control'
        />
     </div>
      <div className='mb-3'>
      <label htmlFor="password">Postcode</label>
      <input
          type="text"
          name="postcode"
          value={formData.postcode}
          onChange={handleChange}
          required
          className='form-control'
        />
      </div>
      <div className='mb-3 price-container'>
     <label htmlFor="password">Price per hour:</label>
     <div className='price-container__input'>
     <span className='pound-sign'>£</span> 
     <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          className='form-control'
        /> 
     </div>

     </div>
      <div className='mb-3'>
      <label htmlFor="password">Upload an image <span className='italics'>e.g. an image of your garage</span></label>
      <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className='form-control mt-1'
        />
      </div>
<div className='button-container'>
<Button 
  type="submit" 
  disabled={loading}
  title={loading ? 'Adding...' : 'Add spot'} customClass='submit-button'/>
</div>
 



      </form>
      </div>
  

      <div className='mb-3'>

      <ListedSpots />
      </div>
    </div>
  );
}
