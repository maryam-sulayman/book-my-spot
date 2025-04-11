import React, {useState} from 'react'
import Search from '../components/Search'
import headerImage from '../images/headerimage.png'
import '../styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../components/Button'
import ReviewBackground from '../images/review-background.png'
import ClientTwo from '../images/client-two.png'
import categoryOne from '../images/Container-two.png'
import categoryTwo from '../images/Container-four.png'
import categoryThree from '../images/Container-one.png'
import categoryFour from '../images/Container-five.png'
import categoryFive from '../images/Container.png'
import categorySix from '../images/Container-three.png'
import downloadImage from '../images/download.png'
import footerGraphic from '../images/footer-image.png'

export default function Dashboard() {
  const [showAnswers, setShowAnswers] = useState({});

  const handleShowResponse = (id) => {
    setShowAnswers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const questions = [
    { id: 1, question: "What is Book My Spot app?", answer: "BookMySpot is an app created to connect drivers in need of parking with parking space owners." },
    { id: 2, question: "How do I create an account?", answer: "You can create an account by clicking on the 'Sign up' button and filling out the registration form." },
    { id: 3, question: "Is Book My Spot free to use?", answer: "Yes, signing up and browsing parking spots is free. Fees apply only when booking." },
    { id: 4, question: "Can I rent out my parking space?", answer: "Yes, you can rent out your parking space by signing up as a parking space owner." },
  ];

  return (
    <div className="dashboard-container">
      <div className='image-container'>
      <img src={headerImage} alt="header image" className="img-fluid"/>
      <div className="overlay">
      <div className="hero-text">
            <h1>Welcome to</h1>
            <h1 className="brand-name">BOOKMYSPOT</h1>
            <p className="hero-description">
              Whether you're commuting to work, heading to an event, or simply running errands, our platform connects you with affordable and convenient parking spaces in real time.
            </p>
          </div>
     
          <Search />
      </div>
   
      </div>


      <section className='category-section'>
        <div className='category-section__container' >
        <div className='category__container'>
        <img src={categoryFive} className='img-fluid category-image'/>
        <div className='category-top'>
        <div>
        <p className='category-section__title'>Garnier Street</p>
        <p className='postcode'>SE1 2UP</p>
        </div>
        <div>
      <p className='rating'> <FontAwesomeIcon icon="star" className='star-icon star-icon--rated'/>Highly rated</p>
      </div>
        </div>
        <hr className='line'/>
        <div className='details'>
        <p>Price: <span>£12 p/h</span></p>
        <p>Available: <span>Yes</span></p>
        </div>
       
        <Button title="Book Now" customClass="quick-book"/>
        </div>
        <div className='category__container'>
        <img src={categoryThree} className='img-fluid category-image'/>
        <div className='category-top'>
        <div>
        <p className='category-section__title'>Baker Street</p>
        <p className='postcode'>SE1 2UP</p>
        </div>
        <div>
      <p className='rating'> <FontAwesomeIcon icon="star" className='star-icon star-icon--rated'/>Highly rated</p>
      </div>
        </div>
        <hr className='line'/>
        <div className='details'>
        <p>Price: <span>£12 p/h</span></p>
        <p>Available: <span>Yes</span></p>
        </div>
       
        <Button title="Book Now" customClass="quick-book"/>
        </div>
        <div className='category__container'>
        <img src={categoryOne} className='img-fluid category-image'/>
        <div className='category-top'>
        <div>
        <p className='category-section__title'>Tower Bridge</p>
        <p className='postcode'>SE1 2UP</p>
        </div>
        <div>
      <p className='rating'> <FontAwesomeIcon icon="star" className='star-icon star-icon--rated'/>Highly rated</p>
      </div>
        </div>
        <hr className='line'/>
        <div className='details'>
        <p>Price: <span>£12 p/h</span></p>
        <p>Available: <span>Yes</span></p>
        </div>
       
        <Button title="Book Now" customClass="quick-book"/>
        </div>
        <div className='category__container'>
        <img src={categoryFour} className='img-fluid category-image'/>
        <div className='category-top'>
        <div>
        <p className='category-section__title'>Greenwich Park</p>
        <p className='postcode'>SE1 2UP</p>
        </div>
        <div>
      <p className='rating'> <FontAwesomeIcon icon="star" className='star-icon star-icon--rated'/>Highly rated</p>
      </div>
        </div>
        <hr className='line'/>
        <div className='details'>
        <p>Price: <span>£12 p/h</span></p>
        <p>Available: <span>Yes</span></p>
        </div>
       
        <Button title="Book Now" customClass="quick-book"/>
        </div>
        <div className='category__container'>
        <img src={categoryTwo} className='img-fluid category-image'/>
        <div className='category-top'>
        <div>
        <p className='category-section__title'>Oxford Street</p>
        <p className='postcode'>SE1 2UP</p>
        </div>
        <div>
      <p className='rating'> <FontAwesomeIcon icon="star" className='star-icon star-icon--rated'/>Highly rated</p>
      </div>
        </div>
        <hr className='line'/>
        <div className='details'>
        <p>Price: <span>£12 p/h</span></p>
        <p>Available: <span>Yes</span></p>
        </div>
       
        <Button title="Book Now" customClass="quick-book"/>
        </div>
        <div className='category__container'>
        <img src={categorySix} className='img-fluid category-image'/>
        <div className='category-top'>
        <div>
        <p className='category-section__title'>Trafalgar Street</p>
        <p className='postcode'>SE1 2UP</p>
        </div>
        <div>
      <p className='rating'> <FontAwesomeIcon icon="star" className='star-icon star-icon--rated'/>Highly rated</p>
      </div>
        </div>
        <hr className='line'/>
        <div className='details'>
        <p>Price: <span>£12 p/h</span></p>
        <p>Available: <span>Yes</span></p>
        </div>
       
        <Button title="Book Now" customClass="quick-book"/>
        </div>
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
        
        <section className='review-container'>
         <h2 className='dashboard-title'>What our clients say about us</h2>
        <img src={ReviewBackground} className='review-container__image'/>
        <div className='review-container__background'>


        <div className='review-card background'>
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
        <div className='review-card background'>
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
        </div>        <div className='review-card background'>
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
        </section>
  
      <section className="help-section">
        <div>
        <h2 className="dashboard-title--help-section dashboard-title">Questions? We're here to help</h2>
      {questions.map((item) => (
        <div className="help-section__card" key={item.id}>
          <h3 className="help-section__question">
            {item.question}
            <button onClick={() => handleShowResponse(item.id)} className='toggle-button'>
              {showAnswers[item.id] ? (
                <FontAwesomeIcon icon="angle-up" className="arrow-icon" />
              ) : (
                <FontAwesomeIcon icon="angle-down" className="arrow-icon" />
              )}
            </button>
          </h3>
          {showAnswers[item.id] && (
            <p className="help-section__answer">{item.answer}</p>
          )}
        </div>
      ))}
        </div>
        <div className='download-image-container'>
        <div>
<h2 className="dashboard-title mb-4">Download our app</h2>
<img src={downloadImage} className='img-fluid'/>
</div>
<section className='section-four'>
    <div className='section-four__image-container'>
      <img src={footerGraphic} className='img-fluid section-four__image'/>
    </div>
    </section>
        </div>

    </section>
    <footer className='footer'>

      <div>
    <h4 className='footer__title'>Support</h4>
   <p className='footer__details'>+ (44) 75438901</p>
   <p className='footer__details'>bookmyspot.enquires.co.uk</p>
    </div>
    <div>
      <h4 className='footer__title'>Follow us:</h4>
      <p className='footer__details'>Instagram</p>
      <p className='footer__details'>Instagram</p>
    </div>
    </footer>
    </div>
  )
}
