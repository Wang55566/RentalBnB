import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
      </>
    );
  }

  return (
    <div className='header'>
      <ul className='list'>
        <li className='logo'>
          <NavLink exact to="/"><i class="fas fa-camera fa-8x"></i></NavLink>
        </li>
        <li className='profile'>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
