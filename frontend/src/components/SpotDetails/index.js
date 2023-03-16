import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {readSpots, readOneSpot} from '../../store/spot';

const SpotDetails = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const spot = useSelector(state => state.spot.singleSpot);

  useEffect(() => {
    dispatch(readOneSpot(id));
    dispatch(readSpots())
  }, [dispatch, id]);

  return (
    <div>
      <div className='spot-picitures'>
        {Object.values(spot).length !== 0 && spot.SpotImages.map(img =>
          <img key={img.id} className="image_placeholder"/>
        )}
      </div>
      <div>
        {spot.numReviews}
        {spot.avgStarRating}
        {spot.price}
        {Object.values(spot).length && spot.Owner.firstName}
        {Object.values(spot).length && spot.Owner.lastName}
      </div>
    </div>
  )
}

export default SpotDetails;
