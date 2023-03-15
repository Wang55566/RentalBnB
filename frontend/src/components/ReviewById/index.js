import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { readReviews } from "../../store/review";

const ReviewsByReviewId = () => {

  const dispatch = useDispatch();

  const {id} = useParams();

  const spotReviews = useSelector(state => state.reviews)

  useEffect(() => {
    dispatch(readReviews(id));
  }, [dispatch, id]);

  return (
    <div className='reviews'>
      {Object.values(spotReviews).length && Object.values(spotReviews.reviews).map((review) =>
          <div key={review.id} className='reviews'>
            {review.review}
          </div>
      )}
    </div>
  )
}

export default ReviewsByReviewId
