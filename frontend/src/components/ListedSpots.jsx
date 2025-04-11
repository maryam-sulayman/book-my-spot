import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Spots.css';

export default function ListedSpots() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get('/spots/my-spots', { withCredentials: true });
        setSpots(response.data);
      } catch (err) {
        console.error('Failed to fetch spots:', err.response?.data || err.message);
        setError('Unable to load your listed spots. Please try again later.');
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
      <h2 className="spots-container__title mb-4">Your Listed Spots</h2>
      {spots.length === 0 ? (
        <p>No spots listed yet.</p>
      ) : (
        <div className="spots-grid">
          {spots.map((spot) => (
            <div key={spot.id} className="spot-card">
              {/* Display images */}
              <div className="spot-images">
                {spot.images &&
                  JSON.parse(spot.images).map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:4000${image}`}
                      alt="Spot"
                      className="img-fluid spot-image"
                    />
                  ))}
              </div>

              {/* Display details */}
              <div className="spot-details">
                <p className="label">
                  Address: <span className="info">{spot.address}</span>
                </p>
                <p className="label">
                  Price per hour: <span className="info">£{spot.price_per_hour}</span>
                </p>
                <p className="label">
                  Available: <span className="info">{spot.is_available ? 'Yes' : 'No'}</span>
                </p>

                {/* Display availability times */}
                <div className="availability">
                  <p className="label">Availability Times:</p>
                  {spot.availability && spot.availability.length > 0 ? (
                    <ul className="availability-list">
                      {spot.availability.map((slot, index) => (
                        <li key={index}>
                          Date: {slot.date}, {slot.start_time} - {slot.end_time}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No availability set.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
