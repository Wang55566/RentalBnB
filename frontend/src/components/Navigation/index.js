import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
      <ul className='list'>
        <li className='logo'>
          <NavLink to="/"><i className="fas fa-camera fa-8x"></i></NavLink>
        </li>
        <li>
          <NavLink to="/spots/new" className='create-new-spot'>Create A New Spot</NavLink>
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
