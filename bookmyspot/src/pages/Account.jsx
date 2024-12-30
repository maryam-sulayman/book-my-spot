import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext'
import { Navigate, useParams, Link} from 'react-router-dom'
import '../styles/Account.css'
import Button from '../components/Button'
import axios from 'axios'
import Spots from './Spots'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Account() {
    const {ready, user, setUser} = useContext(UserContext)
    const {subpage} = useParams()
    const activeSubpage = subpage || 'profile' 
    const [redirect, setRedirect] = useState(null)

if(!ready) {
    return 'Loading...'
}

 if(ready && !user && !redirect){
    return <Navigate to={'/sign-in'}/>
 }

 if (redirect) {
    return <Navigate to={redirect}/>
 }

 const handleSignOut = async () => {
 await axios.post('/sign-out', {}, { withCredentials: true });
 setRedirect('/')
 setUser(null);
 }



  return (
    <div>
    <nav className='link-container'>
        <Link to={'/account/profile'} className={activeSubpage === 'profile' ? 'active-link' : 'link'}> <FontAwesomeIcon icon="user" className='nav-icon account-icon' />My profile</Link>
        <Link to={'/account/spots'} className={activeSubpage === 'spots' ? 'active-link' : 'link'}>  <FontAwesomeIcon icon="list" className='nav-icon account-icon' /> My spots</Link>
        <Link to={'/account/messages'} className={activeSubpage === 'messages' ? 'active-link' : 'link'}> <FontAwesomeIcon icon="envelope" className='nav-icon account-icon' />My messages</Link>
    </nav>

    {activeSubpage === 'profile' && (
        <div className='profile-page'>
        Logged in as {user.name} ({user.email})
        <Button title="Sign out" handleClick={handleSignOut}/>
        </div>
    )}

{activeSubpage === 'spots' && (
        <div>
            <Spots/>
        </div>
    )}
    </div>
  )
}
