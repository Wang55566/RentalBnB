import { csrfFetch } from './csrf';

const LOAD = "reviews/LOAD";
const CREATE = 'review/CREATE';

const load = (payload) => ({
  type: LOAD,
  payload
});

const create = (payload) => ({
  type: LOAD,
  payload
})

export const readReviews = (id) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${id}/reviews`);

  if(response.ok) {
    const reviews = await response.json();
    dispatch(load(reviews));
  }
}

export const createReview = (data, id) => async (dispatch) => {

  console.log('id:', id);
  console.log('data:', data);
  const response = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if(response.ok) {
    const newReview = await response.json();
    return dispatch(create(newReview))
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
    case CREATE:
      const newReview = {};
      return null
    default: return state;
  }
}

export default reviewReducer;
