import { csrfFetch } from './csrf';

const LOAD = "user/LOAD";

const load = (payload) => ({
  type:LOAD,
  payload
})

export const readOneReview = (spotId) => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current');
  if(response.ok) {
    const review = await response.json();
    const found = review.Reviews.find( oneReview => oneReview.Spot.id === spotId);
    if(found) {
      dispatch(load(found));
    }
  };
}

const initialSate = { User: {} };

const userReducer = (state = initialSate, action) => {
  switch(action.type) {
    case LOAD:
      const ReviewUser = {}
      ReviewUser[action.payload.id] = action.payload;
      return ReviewUser;
    default: return state;
  }
}

export default userReducer;
