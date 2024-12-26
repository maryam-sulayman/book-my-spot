import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  return (
    <Router>
      <div className="App">
      <nav className='home-navbar pt-3 pb-3'>
        <div>
        <a href="/" className='link'><FontAwesomeIcon icon="gbp" className='nav-icon money'/> Earn money </a>
        </div>
        <div>
        <a href="/sign-in"> <FontAwesomeIcon icon="automobile" className='nav-icon car'/>Book a spot</a>
        </div>
        <div  className='sign-up-button-container'>
        <a href="/sign-up">Sign Up</a>
        </div>
        <div className='sign-in-button-container'>
        <FontAwesomeIcon icon="user" className='user-icon'/>
        <a href="/sign-in">Sign In</a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
