import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {deleteASpot, readSpotsByUser} from '../../store/spot';

const DeleteSpotModal = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();

  const spot = useSelector(state => state.spot.singleSpot)

  const onClick = async () => {
    await dispatch(deleteASpot(spot.id));
    await dispatch(readSpotsByUser())
    closeModal()
  }

  return (
    <div className='delete-spot-form'>
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot<br>
      </br>from the listings?</h2>
      <div className='delete-spot-button'>
        <button className='yes' onClick={onClick}>Yes</button>
        <button className='no' onClick={closeModal}>No</button>
      </div>

    </div>
  )
}

export default DeleteSpotModal;
