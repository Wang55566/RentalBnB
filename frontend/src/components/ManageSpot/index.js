import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {readSpots, readOneSpot, readSpotsByUser} from '../../store/spot';

import { NavLink, Route, useParams } from "react-router-dom";

import OpenModalButton from '../OpenModalButton';

import DeleteSpotModal from "../DeleteModel";

import './Manage.css';

const CurrentUserSpot = () => {

const dispatch = useDispatch();

useEffect(() => {
  dispatch(readSpotsByUser())
},[dispatch])

const spotsByUser = useSelector((state) => {
  return state.spot.allSpots
})

return (
  <>
  <h1>Manage Spots</h1>
  <div>
    {Object.values(spotsByUser).length !== 0 ? "" : <NavLink to="/spots/new" className='create-spot'>Create A New Spot</NavLink>}
  </div>
  <div className='all-spots'>
    {Object.values(spotsByUser).map(spot => {
      return (
      <div key={spot.id} className='spots-holder'>
        <NavLink to={`/spots/${spot.id}`}>
        {spot.previewImage ? <img className="image_placeholder" src= {spot.previewImage} alt=''/> : <img className="image_placeholder"/>}
        </NavLink>
        <div className='rating'>
            {spot.avgRating ? <span className="fa fa-star">{spot.avgRating}</span>
            :<span className="fa fa-star">NEW</span>}
        </div>
        <div className='spot-info'>
            <p className='location'>{spot.city},{spot.state}</p>
            <p className='price'>${spot.price} night</p>
        </div>
        <div className='update-delete-button'>
            <NavLink className='update-botton' to={`/spots/${spot.id}/edit`}>Update</NavLink>
            <div className='delete-botton'>
              <OpenModalButton
                buttonText="Delete"
                onButtonClick={() => dispatch(readOneSpot(spot.id))}
                modalComponent={<DeleteSpotModal />}
              />
            </div>
        </div>
      </div>)
    })}
  </div>
  </>
  )}

export default CurrentUserSpot;
