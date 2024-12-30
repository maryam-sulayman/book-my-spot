import React, { useContext } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../userContext';

function Navigation() {
  const { user } = useContext(UserContext);

  return (
    <nav className='home-navbar pt-3 pb-3'>
      <div>
        <a href="/">
          <FontAwesomeIcon icon="gbp" className='nav-icon money' /> Earn money
        </a>
      </div>
      <div>
        <a href="/searchPage">
          <FontAwesomeIcon icon="automobile" className='nav-icon car' /> Book a spot
        </a>
      </div>
      <div className='flex'>
        {!!user ? (
          <>
            <div className='sign-up-button-container'>
              <span className='username__container'>
                Welcome, <a className='username' href="/account">{user.name}!</a>
              </span>
            </div>
          </>
        ) : (
          <>
            <div className='sign-up-button-container'>
              <a href="/sign-up">Sign Up</a>
            </div>
            <div className='sign-in-button-container'>
              <FontAwesomeIcon icon="user" className='user-icon' />
              <a href="/sign-in">Sign In</a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
