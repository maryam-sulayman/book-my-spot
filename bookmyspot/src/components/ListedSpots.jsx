import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Spots.css'

export default function ListedSpots() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get('/spots', { withCredentials: true });
        setSpots(response.data);
      } catch (err) {
        console.error('Failed to fetch spots:', err.response?.data || err.message);
        setError('Unable to load spots. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  if (loading) return <p>Loading spots...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="listed-spots-container">
      <h2 className='spots-container__title mb-4'>Your listed spots</h2>
      {spots.length === 0 ? (
        <p>No spots listed yet.</p>
      ) : (
        <div className="spots-grid">
         {spots.map((spot) => (
    <div key={spot._id} className='spot-card'>
        <div>
        <img src={`http://localhost:4000${spot.image}`} alt="Spot" className='img-fluid spot-image'/>
        </div>
        <div>
        <p className='label' >Address:<span className='info'> {spot.location.address}</span></p>
        <p className='label'>Price per hour: <span className='info'>  £{spot.pricePerHour}</span></p>
        <p className='label'>Available: <span className='info'> {spot.isAvailable ? 'Yes' : 'No'}</span></p>
        </div>
    </div>
))}

        </div>
      )}
    </div>
  );
}
