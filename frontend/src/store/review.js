import { csrfFetch } from './csrf';

const LOAD = "reviews/LOAD";

const load = (payload) => ({
  type: LOAD,
  payload
});

export const readReviews = (id) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${id}/reviews`);

  if(response.ok) {
    const reviews = await response.json();
    dispatch(load(reviews));
  }
}

const initialSate = { reviews:{} };

const reviewReducer = (state = initialSate, action) => {
  switch(action.type) {
    case LOAD:
      const reviews = {};
      action.payload.Reviews && action.payload.Reviews.forEach((review) => {
        reviews[review.id] = review;
      });
      return {
        ...state, reviews: {...reviews}
      };

    default: return state;
  }
}

export default reviewReducer;
