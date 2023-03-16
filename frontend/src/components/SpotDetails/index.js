import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {readSpots, readOneSpot} from '../../store/spot';

import './SpotDetails.css';

const SpotDetails = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const spot = useSelector(state => state.spot.singleSpot);

  useEffect(() => {
    dispatch(readOneSpot(id));
    dispatch(readSpots())
  }, [dispatch, id]);

  return (
    <>
    <div className='spot-details'>
      <h1>{spot.name}</h1>
      <h2>{spot.city}, {spot.state}, {spot.country}</h2>
      <div className='spot-picitures'>
        {Object.values(spot).length !== 0 && spot.SpotImages.map(img =>
          <img key={img.id} className="image_placeholder"/>
        )}
      </div>
    </div>
      <div className='spot-content'>
      <p className ='host-text'>Host By {Object.values(spot).length && spot.Owner.firstName} {Object.values(spot).length && spot.Owner.lastName}</p>
      <div className='reserve-box'>
        <div className='reserve-detail'>
          <div className='review-numbers'>{spot.numReviews} reviews</div>
          <div className='rating'>rating {spot.avgStarRating}</div>
          <div className='price'>${spot.price} night</div>
        </div>
      </div>
      <p>{spot.description}</p>
      <button class='reserve-button'>Reserve</button>
      </div>
      <div>
      </div>
    </>
  )
}

export default SpotDetails;
