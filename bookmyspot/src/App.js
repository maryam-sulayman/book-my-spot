import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';

function App() {
  return (
    <div className="App container">
      <nav className='home-navbar'>
        <a href="/" className='link'>List your space for free</a>
        <a href="/sign-in">How it works</a>
        <a href="/sign-in">Sign Up</a>
        <a href="/sign-in">Sign In</a>
      </nav>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
