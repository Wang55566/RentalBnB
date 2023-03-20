import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { readOneSpot, readSpots } from '../../store/spot'

import OpenModalButton from '../OpenModalButton';

import ReviewModal from "../ReviewModal";

import {restoreUser} from '../../store/session';



const PostReview = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const spot = useSelector(state => state.spot.singleSpot);
  const user = useSelector(state => state.session.user);



  useEffect(() => {
    dispatch(readOneSpot(id));
    dispatch(readSpots());
    dispatch(restoreUser());
  }, [dispatch, id]);


  useEffect(() => {
  }, [dispatch, id]);

  return (
    <div className='post-review'>
      <OpenModalButton
        buttonText="Post Your Review"
        onButtonClick={() => dispatch(readOneSpot(spot.id))}
        modalComponent={<ReviewModal />}
      />
    </div>
  )

}

export default PostReview;
