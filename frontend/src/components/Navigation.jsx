import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation for route detection
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../userContext';

function Navigation() {
  const { user } = useContext(UserContext);
  const location = useLocation(); // Get the current route

  // Check if the current route is the dashboard
  const isDashboard = location.pathname === '/';

  return (
    <nav className={`home-navbar ${isDashboard ? 'dashboard-navbar' : ''}`}>
      {/* Logo */}
      <div className="logo-container">
        <a href="/" className="logo">
          BOOKMYSPOT
        </a>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <a href="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </a>
        <a href="/available-spots" className="nav-link">
          Book
        </a>
        <a href="/contact" className="nav-link">
          Contact Us
        </a>
        <a href="/products-and-services" className="nav-link">
          Our Products 
        </a>
      </div>

      {/* User Section */}
      <div className="user-section">
        {!!user ? (
          <a className="user-info" href='/account'>
            <span className="user-name">{user.name}</span>
            <FontAwesomeIcon icon="user" className="user-icon" />
          </a>
        ) : (
          <>
            <a href="/sign-up" className="user-link">
              Sign up
            </a>
            <a href="/sign-in" className="user-link login-button">
              Login
            </a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
