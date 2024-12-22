import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  return (
    <Router>
        <div className="App">
      <nav className='home-navbar pt-3'>
        <div>
        <a href="/" className='link'><FontAwesomeIcon icon="gbp" className='nav-icon money'/> Earn money </a>
        </div>
        <div>
        <a href="/sign-in"> <FontAwesomeIcon icon="automobile" className='nav-icon car'/>Book a spot</a>
        </div>
        <div  className='sign-up-container'>
        <a href="/sign-in">Sign Up</a>
        </div>
        <div className='sign-in-container'>
        <FontAwesomeIcon icon="user" className='user-icon'/>
        <a href="/sign-in">Sign In</a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
