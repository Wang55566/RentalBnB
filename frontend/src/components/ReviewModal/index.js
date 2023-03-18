import { useEffect, useState } from 'react';
import { useModal } from "../../context/Modal";
import { useDispatch , useSelector } from 'react-redux';
import {createReview} from '../../store/review'

import './ReviewForm.css';

const ReviewModal = () => {

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const spot = useSelector(state => state.spot.singleSpot)

  const onClick = () => {

  }

  useEffect(() => {
    console.log(stars)
  },[stars])

  const submit = async () => {

    const payload = {
      review,
      stars
    }

    await dispatch(createReview(payload, spot.id))
    closeModal();

  }

  // const onClickStarFive = () => {

  // }

  return (
    <div className='post-review'>
      <label>
        How was your stay?
        <textarea
          value={review}
          onChange={ (e) => setReview(e.target.value)}
        />
      </label>
      <div className='stars + ${rating}'>
        <span className="fa fa-star" id="star1" onClick={() => {setStars(5)}}></span>
        <span className="fa fa-star" id="star2" onClick={() => {setStars(4)}}></span>
        <span className="fa fa-star" id="star3" onClick={() => {setStars(3)}}></span>
        <span className="fa fa-star" id="star4" onClick={() => {setStars(2)}}></span>
        <span className="fa fa-star" id="star5" onClick={() => {setStars(1)}}></span>
      </div>
      <button className='post-review-button' onClick={submit}>Submit Your Review</button>
    </div>
  )
};

export default ReviewModal;
