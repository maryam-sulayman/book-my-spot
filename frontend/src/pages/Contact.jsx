import React, { useState }  from 'react';
import '../styles/Contact.css';
import contactMap from '../images/contactmap.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    });
    const [status, setStatus] = useState('');

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();
setStatus('Sending...');

try {
const response = await axios.post('http://localhost:4000/send-email', formData);
setStatus('Your message has been sent successfully!');
setFormData({ name: '', email: '', subject: '', message: '' }); 
} catch (error) {
console.error('Error sending the message:', error);
setStatus('Failed to send the message. Please try again later.');
}
};
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>If you have any questions, our team is happy to help.</p>
      </div>


      <div className="contact-main container">
        <div className='column'>
        <div className="contact-info">
      <div className="info-card">
        <FontAwesomeIcon icon="phone-alt" className="info-icon" />
        <h4>Phone</h4>
        <p>+44 782401334</p>
      </div>
      <div className="info-card">
        <FontAwesomeIcon icon="envelope" className="info-icon" />
        <h4>Email</h4>
        <p>info@bmspot.co.uk</p>
      </div>
      <div className="info-card">
        <FontAwesomeIcon icon={faWhatsapp} className="info-icon" />
        <h4>Whatsapp</h4>
        <p>+44 782401334</p>
      </div>
      <div className="info-card">
        <FontAwesomeIcon icon="building" className="info-icon" />
        <h4>Office</h4>
        <p>Park Lane, London</p>
      </div>
      </div>
    <div className="map-container">
            <img src={contactMap} alt="Map location" className="map-image" />
          </div>
        </div>

        <div className="contact-form">
          <h3>Get In Touch!</h3>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" onChange={handleChange} name="name" id="name" className="form-control" placeholder="Enter your name" />
            <label>Email</label>
            <input type="email" onChange={handleChange} name="email" id="email" className="form-control" placeholder="Enter your email" />
            <label>Subject</label>
            <input type="text" onChange={handleChange} name="subject" id="subject" className="form-control" placeholder="Enter subject" />
            <label>Message</label>
            <textarea name="message" onChange={handleChange} className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
            <button type="submit" className="send-button">Send message</button>
          </form>
          {status && <p>{status}</p>}
        </div>
      </div>

      <div className="contact-footer">
        <div className="support-section">
          <p>Support</p>
          <p>+ (44) 75438901</p>
          <p>bookmyspot.enquires.co.uk</p>
        </div>
        <div className="social-section">
          <p>Follow us:</p>
          <p><i className="fab fa-instagram"></i> Instagram</p>
          <p><i className="fab fa-twitter"></i> Twitter</p>
        </div>
      </div>
    </div>
  );
}
