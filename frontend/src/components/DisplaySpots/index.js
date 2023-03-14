import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, Route, useParams } from "react-router-dom";


import { readSpots, readOneSpot } from "../../store/spot";

import './Spots.css';

const AllSpots = () => {
  const dispatch = useDispatch();

  const allSpots = useSelector((state) => {
    return state.spot.allSpots
  })

  useEffect(() => {
    dispatch(readSpots());
  }, [dispatch]);

  return (
    <div className='all-spots'>
      {Object.values(allSpots).map(spot => {
        return (
        <div key={spot.id} className='spots-holder'>
          <NavLink to={`/spots/${spot.id}`}>
            <div className='spot-picitures'>
              <img src={spot.previewImage} alt='no image'/>
           </div>
          </NavLink>
          <p>{spot.state}, {spot.city}</p>
        </div>)
      })}
    </div>
  )
}

export default AllSpots;