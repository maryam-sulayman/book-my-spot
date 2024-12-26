import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/SignIn.css';
import Button from '../components/Button';
import axios from 'axios';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [redirect, setRedirect] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
        const response = await axios.post('/sign-in', {
            email: formData.email,  
            password: formData.password, 
        }, {   
            withCredentials: true, 
        });
        alert('Login successful');
        setRedirect(true)
    } catch (error) {
        alert('Sign in failed. Please try again later.');
    }
  };

  if(redirect) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className="sign-in-container">
      <h1 className='sign-in-container__title'>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
            className="form-control" 
          />
        </div>
        <Button type='submit' title='Sign in' customClass='button'/>
        <div className='sign-up-wrapper'>
          <p className='sign-up-text'>Don't have an account? <Link to={'/sign-up'} className='sign-up-link'>Sign up</Link></p>
        </div>
      </form>
    </div>
  );
}
