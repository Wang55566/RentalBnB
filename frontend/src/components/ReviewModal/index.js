import { useEffect, useState } from 'react';
import { useModal } from "../../context/Modal";
import { useDispatch , useSelector } from 'react-redux';
import {createReview, readReviews} from '../../store/review'

import './ReviewForm.css';
import { readOneSpot } from '../../store/spot';

const ReviewModal = () => {

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const spot = useSelector(state => state.spot.singleSpot)

  useEffect(() => {
  },[stars])

  const submit = async () => {

    const payload = {
      review,
      stars
    }

    await dispatch(createReview(payload, spot.id))
    await dispatch(readReviews(spot.id));
    await dispatch(readOneSpot(spot.id))

    closeModal();

  }

  return (
    <div className='post-review'>
      <label className='textarea'>
        How was your stay?
        <textarea
          placeholder ='Leave your review here...'
          value={review}
          onChange={ (e) => setReview(e.target.value)}
        />
      </label>
      <div className='stars'>
        <span className="fa fa-star" id="star1" onClick={() => {setStars(5)}}></span>
        <span className="fa fa-star" id="star2" onClick={() => {setStars(4)}}></span>
        <span className="fa fa-star" id="star3" onClick={() => {setStars(3)}}></span>
        <span className="fa fa-star" id="star4" onClick={() => {setStars(2)}}></span>
        <span className="fa fa-star" id="star5" onClick={() => {setStars(1)}}></span>
        <label>Stars</label>
      </div>
      <button className='post-review-button' disabled={stars === 0 || review.length < 10} onClick={submit}>Submit Your Review</button>
    </div>
  )
};

export default ReviewModal;
