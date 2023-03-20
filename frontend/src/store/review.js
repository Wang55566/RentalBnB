import { csrfFetch } from './csrf';

const LOAD = "reviews/LOAD";
const CREATE = 'review/CREATE';
const REMOVE = 'review/REMOVE';

const load = (payload) => ({
  type: LOAD,
  payload
});

const create = (payload) => ({
  type: CREATE,
  payload
})

const remove = (payload) => ({
  type: REMOVE,
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

export const removeReview = (reviewId) => async (dispatch) => {

  const response = await csrfFetch(`/api/reviews/${reviewId}`,
  {
    method: "delete",
  })

  if (response.ok) {
    dispatch(remove(reviewId))
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
      const newReview = {...state, reviews: {...state.reviews}};
      const id = action.payload.id;
      newReview.reviews[id] = action.payload;
      return newReview;
    case REMOVE:
      const removeReview = {...state, reviews: {...state.reviews}};
      delete removeReview.reviews[action.payload.id];
      return removeReview;

    default: return state;
  }
}

export default reviewReducer;
