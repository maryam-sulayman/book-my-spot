import React, { useState } from 'react';
import '../styles/SignIn.css';
import Button from '../components/Button'
import axios from 'axios'

export default function SignIn() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('/sign-up',{
            name: formData.name, 
            email: formData.email,
            password: formData.password,
        }, 
         {   
            withCredentials: true, 
        });
        console.log(response.data);
    } catch (error) {
        alert('Sign up failed. Please try again later.')
    }
};

  return (
    <div className="sign-up-container">
      <h1 className='sign-up-container__title'>Sign up</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="email">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            className="form-control" 
          />
        </div>
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
        <Button type='submit' title='Sign up' customClass='button'/>
        <div className='sign-in-wrapper'>
          <p className='sign-in-text' >Already have an account? <span className='sign-in-link'>Sign in</span></p>
          </div>
      </form>
    </div>
  );
}
