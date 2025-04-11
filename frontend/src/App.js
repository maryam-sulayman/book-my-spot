import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage.jsx';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import Layout from './components/Layout';
import axios from 'axios';
import { UserContextProvider } from './userContext.jsx';
import Account from './pages/Account.jsx';
import 'leaflet/dist/leaflet.css';
import AvailableSpots from './pages/AvailableSpots.jsx'
import BookingDetails from './pages/BookingDetails.jsx';
import AdditionalInfo from './pages/AdditionalInfo.jsx';
import Payment from './pages/Payment.jsx';
import Contact from './pages/Contact.jsx';
import Reviews from './pages/Reviews.jsx'
import Products from './pages/Products.jsx'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminPanel from './pages/AdminDashboard.jsx';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/available-spots" element={<AvailableSpots />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account/:subpage?" element={<Account />} />
              <Route path="/booking-details" element={<BookingDetails />} />
              <Route path="/additional-info" element={<AdditionalInfo />} />
              <Route
                path="/payment"
                element={
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                }
              />
              <Route path="/spots/:spotId/review" element={<Reviews />} />
              <Route path="/products-and-services" element={<Products />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
