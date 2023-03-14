import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { readReviews } from "../../store/review";

const ReviewsByReviewId = () => {

  const dispatch = useDispatch();

  const {id} = useParams();

  const reviews = useSelector(state => state.reviews)

  useEffect(() => {
    dispatch(readReviews(id));
  }, [dispatch]);

  return (
    <div className='reviews'>
      Reviews
    </div>
  )
}

export default ReviewsByReviewId
