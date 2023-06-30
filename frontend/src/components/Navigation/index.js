import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

import sleepLogo from '../../wallpaper.jpg';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
      <ul className='list'>
        <li className='logo'>
          <NavLink to="/"><img src={sleepLogo} alt="Logo" style={{width:'100px', height:'75px'}}/></NavLink>
        </li>
        <li>
          {sessionUser ? <NavLink to="/spots/new" className='create-new-spot'>Create A New Spot</NavLink> : ""}
        </li>
      {isLoaded && (
        <li className='profile'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </ul>
    </div>
  );
}

export default Navigation;
