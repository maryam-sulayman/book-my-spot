import React, { useState } from 'react';
import '../styles/SignIn.css';
import Button from '../components/Button.jsx';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthImage from '../images/auth.jpeg'
import Logo from '../images/logo.png'

export default function SignUp() {
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
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        '/auth/sign-up', 
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
        { withCredentials: true }
      );
      alert('Sign up successful! Please sign into your account to proceed.');
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
    <div className='layout'>
    <div>
     <img src={AuthImage} className='img-fluid auth-image'/>
    </div>
    <div className="sign-up-container">
    <img src={Logo} className='img-fluid logo'/>
      <h1 className="sign-up-container__title">Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="role">Select a Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="driver">Driver</option>
            <option value="owner">Parking Space Owner</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <Button type="submit" title={loading ? 'Signing up...' : 'Sign up'} customClass="button" />
        <div className="sign-in-wrapper">
          <p className="sign-in-text">
            Already have an account?{' '}
            <Link to={'/sign-in'} className="sign-in-link">
              Sign in
            </Link>
          </p>
        </div>
      </form>
      </div>
    </div>
  );
}
