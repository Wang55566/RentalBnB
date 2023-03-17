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

console.log(spotsByUser)

return (
  <>
  <h1>Manage Your Spots</h1>
  <div>
    {Object.values(spotsByUser).length !== 0 ? "" : <NavLink to="/spots/new" className='create-spot'>Create A New Spot</NavLink>}
  </div>
  <div className='all-spots'>

    {Object.values(spotsByUser).map(spot => {
      return (
      <div key={spot.id} className='spots-holder'>
        <NavLink to={`/spots/${spot.id}`}>
            <img className="image_placeholder"/>
        </NavLink>
        <NavLink to={`/spots/${spot.id}/edit`}>Update</NavLink>
        <p>{spot.city}, {spot.state}</p>
        <p>${spot.price} night</p>
        {spot.avgRating ? <span className="fa fa-star checked">{spot.avgRating}</span>:"NEW"}
        <button>Delete</button>
      </div>)
    })}
  </div>
  </>
  )}

export default CurrentUserSpot;
