import {useModal} from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { removeReview, readReviews } from '../../store/review';
import './deleteReview.css'
import { readOneSpot } from '../../store/spot';

const DeleteReviewModal = () => {

  const dispatch = useDispatch();

  const userReview = useSelector(state => state.user);

  const {closeModal} = useModal();

  const onClickNo = async () => {
    closeModal();
  }

  const onClickYes = async () => {

    await dispatch(removeReview(Object.values(userReview)[0].id))

    await dispatch(readReviews(Object.values(userReview)[0].Spot.id));

    await dispatch(readOneSpot(Object.values(userReview)[0].Spot.id));

    closeModal();
  }

  return (
    <div className='delete-review-box'>
      <h1>
        Confirm Delete
      </h1>
      <h2>
        Are you sure you want to delete this review?
      </h2>
      <button className='delete-yes' onClick={onClickYes}>Yes (Delete Review)</button>
      <button className='delete-no' onClick={onClickNo}>No (Keep Review</button>
    </div>
  )
}

export default DeleteReviewModal;
