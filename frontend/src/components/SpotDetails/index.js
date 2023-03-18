import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {readSpots, readOneSpot} from '../../store/spot';
import {readReviews} from '../../store/review';

import './SpotDetails.css';

import PostReview from '../PostReview';

import {restoreUser} from '../../store/session';

const SpotDetails = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spot.singleSpot);
  const review = useSelector(state => state.reviews);

  console.log(spot, review)

  useEffect(() => {
    dispatch(readOneSpot(id));
    dispatch(readSpots())
    dispatch(readReviews(id))
  }, [dispatch]);

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
          <div className='review-numbers'>{spot.numReviews > 0 ? `review: ${spot.numReviews}` : <span className="fa fa-star">NEW</span>}</div>
          <div className='rating'>{spot.numReviews > 0 ? `rating: ${spot.avgStarRating}` : ""}</div>
          <div className='price'>${spot.price} night</div>
        </div>
      </div>
      <p>{spot.description}</p>
      <button className='reserve-button'>Reserve</button>
      </div>
      <div className='reserve-detail'>
          <div className='review-numbers'>{spot.numReviews > 0 ? `review: ${spot.numReviews}` : <span className="fa fa-star">NEW</span>}</div>
          <div className='rating'>{spot.numReviews > 0 ? `rating: ${spot.avgStarRating}` : ""}</div>
      </div>
      <div className='post-review-button'>
      </div>
      <div>
          {}
      </div>
    </>
  )
}

export default SpotDetails;
