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
      {Object.values(allSpots).length && Object.values(allSpots).map(spot => {
        return (
        <div key={spot.id} className='spots-holder'>
          <NavLink to={`/spots/${spot.id}`}>
              <img className="image_placeholder" alt=''/>
          </NavLink>
          <div className='rating'>
            {spot.avgRating ? <span className="fa fa-star checked">{spot.avgRating}</span>
            :<span className="fa fa-star checked">NEW</span>}
          </div>
          <div className='spot-info'>
            <p className='location'>{spot.city},{spot.state}</p>
            <p className='price'>${spot.price} night</p>
          </div>
        </div>)
      })}
    </div>
  )
}

export default AllSpots;
