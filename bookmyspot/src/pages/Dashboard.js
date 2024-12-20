import React from 'react'
import Search from '../components/Search'
import headerImage from '../images/headerimage.png'
import '../styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardImage from '../images/dashboard-image.png'
import Button from '../components/Button'
import ReviewBackground from '../images/review-background.png'
import ClientTwo from '../images/client-two.png'

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className='image-container container'>
      <img src={headerImage} alt="header image" className="img-fluid"/>
      <div className="overlay"></div>
      <Search/>
      </div>
      <div className='offer-list-container'>
        <div className='offer-list'>
        <span className='offer'> <FontAwesomeIcon icon="check-circle" className='check-icon'/> Guaranteed parking</span>
        <span className='offer'> <FontAwesomeIcon icon="check-circle" className='check-icon'/> Secure bookings</span>
        <span className='offer'> <FontAwesomeIcon icon="check-circle" className='check-icon'/> Stress free</span>
        </div>
      </div>
      <section className='section-one'>
          <div className='image-container'>
        <img src={DashboardImage} className='img-fluid'/>
       </div>
       <div className='about-container'>
        <p>This platform makes it easy to find, reserve, and pay for parking spaces near you. </p>
        <p style={{marginTop: '50px'}}>Whether you're commuting to work, heading to an event, or simply running errands, our platform connects you with affordable and convenient parking spaces in real time.</p>
       </div>
        </section>
        <section className='section-two'>
        <h1 className='dashboard-title'>Ready to book?</h1>
        <div className='section-two__body section-body mt-4'>
        <div className='section-body__text'>
          <p className='section-body__text--title'>Sign in to secure your parking spot</p>
          <p className='section-body__text--content'>Register your space, rent a space, manage your bookings, and much more </p>
        </div>
        <div>
       <Button title="Sign in or create an account" customClass='section-body__cta'/>
        </div>
        </div>
        </section>
        <div className='review-container'>
         <h2 className='dashboard-title'>What our clients say about us</h2>
        <img src={ReviewBackground} className='review-container__image'/>
        <div className='review-container__background'>


        <div className='review-card'>
       <FontAwesomeIcon icon="quote-left" className='quote-icon'/>
        <p className='review-card__review'>Highly recommend, never had any issues renting out my space. A great way to make additional income!</p>
        <div className='review-card__details'>
        <img src={ClientTwo} className='client-image'/>
        <div>
          <p className='name'>Emily Paterson</p>
          <p className='role'>Parking space owner</p>
          <div>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          </div>
        </div>
        </div>
        </div>
        <div className='review-card'>
       <FontAwesomeIcon icon="quote-left" className='quote-icon'/>
        <p className='review-card__review'>Highly recommend, never had any issues renting out my space. A great way to make additional income!</p>
        <div className='review-card__details'>
        <img src={ClientTwo} className='client-image'/>
        <div>
          <p className='name'>Emily Paterson</p>
          <p className='role'>Parking space owner</p>
          <div>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          </div>
        </div>
        </div>
        </div>        <div className='review-card'>
       <FontAwesomeIcon icon="quote-left" className='quote-icon'/>
        <p className='review-card__review'>Highly recommend, never had any issues renting out my space. A great way to make additional income!</p>
        <div className='review-card__details'>
        <img src={ClientTwo} className='client-image'/>
        <div>
          <p className='name'>Emily Paterson</p>
          <p className='role'>Parking space owner</p>
          <div>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          <FontAwesomeIcon icon="star" className='star-icon'/>
          </div>
        </div>
        </div>
        </div>
  
        </div>
        </div>
    </div>
  )
}
