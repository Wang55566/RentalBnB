import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {readSpots, readOneSpot} from '../../store/spot';

import { restoreUser } from "../../store/session";

import { readSpotsByUser } from '../../store/spot';

import { NavLink, Route, useParams } from "react-router-dom";

const CurrentUserSpot = () => {

const dispatch = useDispatch();

useEffect(() => {
  dispatch(readSpotsByUser())
},[dispatch])

const spotsByUser = useSelector((state) => {
  return state.spot.allSpots
})

return (
  <div className='all-spots'>
    {Object.values(spotsByUser).map(spot => {
      return (
      <div key={spot.id} className='spots-holder'>
        <NavLink to={`/spots/${spot.id}`}>
            <img className="image_placeholder"/>
        </NavLink>
        <NavLink to={`/spots/${spot.id}/edit`}>Update</NavLink>
        <p>{spot.state}, {spot.city}</p>
      </div>)
    })}
  </div>
)

}

export default CurrentUserSpot;
