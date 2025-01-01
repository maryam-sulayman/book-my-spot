// /frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to BookMySpot!</h1>
      <p>Find and book parking spaces easily.</p>
      <nav>
        <ul>
          <li><Link to="/product">Our Services</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
