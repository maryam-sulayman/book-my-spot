import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import Layout from './components/Layout';
import axios from 'axios';
import { UserContextProvider } from './userContext.jsx';
import Account from './pages/Account.jsx';
import 'leaflet/dist/leaflet.css';
import SearchResults from './pages/SearchResults.jsx';


axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  return (
    <UserContextProvider>
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/searchPage" element={<SearchResults/>}/>
        <Route path="/account/:subpage?" element={<Account/>}/>
        <Route path="/account/:subpage/:action" element={<Account/>}/>
        </Route>
      </Routes>
    </div>
    </Router>
    </UserContextProvider>
  );
}

export default App;
