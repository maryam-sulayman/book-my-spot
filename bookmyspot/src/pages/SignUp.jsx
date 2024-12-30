import React, { useState } from 'react';
import '../styles/SignIn.css';
import Button from '../components/Button.jsx'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'driver',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        '/sign-up',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
        { withCredentials: true }
      );
      alert('Sign up successful, please sign into your account to proceed.')
      console.log(response.data);
      navigate('/sign-in');
    } catch (error) {
      console.error('Sign up failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
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
        <div className="form-group">
          <label htmlFor="role">Select Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="driver">Driver</option>
            <option value="parking space owner">Parking Space Owner</option>
          </select>
        </div>
        <Button type='submit' title={loading ? 'Signing up...' : 'Sign up'} customClass='button'/>
        <div className='sign-in-wrapper'>
          <p className='sign-in-text' >Already have an account? <Link to={'/sign-in'} className='sign-in-link'>Sign in</Link></p>
          </div>
      </form>
    </div>
  );
}
