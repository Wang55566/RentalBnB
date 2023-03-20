import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { readReviews } from "../../store/review";

import './review.css';

import OpenModalButton from '../OpenModalButton';

import DeleteReviewModal from "../DeleteReviewModal";

import { readOneReview } from "../../store/user";

import PostReview from '../PostReview';

const ReviewsByReviewId = () => {

  const dispatch = useDispatch();

  const {id} = useParams();

  const spotReviews = useSelector(state => state.reviews)
  const spot = useSelector(state => state.spot.singleSpot);
  const currentUser = useSelector(state => state.session.user);

  // sort
  const sorted = Object.values(spotReviews?.reviews).sort((a,b) => Date.parse(b?.createdAt) - Date.parse(a?.createdAt) )


  //

  const checkReview = Object.values(spotReviews.reviews).some( (review) =>
    review?.User?.id === currentUser?.id
  )

  const onClickDelete = async () => {

    await dispatch(readOneReview(spot.id));
  }

  useEffect(() => {
    dispatch(readReviews(id));
  },[]);

  return (
    <div className='reviews'>
      <div className='review-header'>
        <div className='reserve-detail'>
          <div className='review-numbers'>{spot.numReviews > 0 ? `${spot.numReviews}` : <span className="fa fa-star">NEW</span>}</div>
          <div>
            <div>{spot.numReviews === 1 ? `review`: ''}</div>
            <div>{spot.numReviews > 1 ? `reviews`: ''}</div>
            <div>{spot.numReviews === 0 ?  "": ""}</div>
          </div>
          <div className='dot'>{spot.numReviews === 0 ? "" :"·"}</div>
          <div className='rating'><span className="fa fa-star"></span>{spot?.avgStarRating}</div>
        </div>
        <div>
          <div className='post-review-button'>{!currentUser || currentUser?.id === spot.Owner?.id || checkReview === true ? "" : <PostReview/>}</div>
        </div>

      </div>

      <div className='review-content'>
      {Object.values(spotReviews).length && sorted.map((review) =>
          <div key={review.id} className='review-box'>
            <div className='firstName'>
              <span>{review?.User?.firstName}</span>
            </div>
            <div className='year-month'>
              {review.createdAt.split("-")[1]}/{review.createdAt.split("-")[0]}
            </div>
            <div className='comment'>
              {review.review}
            </div>

            { currentUser?.id === review?.User?.id ?
            <div className='delete-review-botton'>
            <OpenModalButton
              buttonText="Delete"
              onButtonClick={onClickDelete}
              modalComponent={<DeleteReviewModal />}
            />
            </div> : <div></div>}

          </div>
        )}
      </div>
         <div className='be-the-first'>
           {!Object.values(spotReviews.reviews).length ? <h2>Be the first to post a review!</h2> : ""}
         </div>
    </div>
  )
}

export default ReviewsByReviewId
