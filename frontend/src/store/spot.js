import { csrfFetch } from './csrf';

const LOAD = "spots/LOAD";
const LOAD_ONE = "spot/LOAD_ONE";
const ADD = "spot/CREATE";
const EDIT = "spot/EDIT";

// Action
const load = (payload) => ({
  type: LOAD,
  payload
});

const loadOne = (payload) => ({
  type: LOAD_ONE,
  payload
});

const addSpot = (payload) => ({
  type: ADD,
  payload
});

const editSpot = (payload) => ({
  type: EDIT,
  payload
});

// Thunk
export const readSpots = () => async (dispatch) => {

  const response = await csrfFetch(`/api/spots`)
  if(response.ok) {
    const spots = await response.json();
    dispatch(load(spots));
  };
};

export const readOneSpot = (id) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${id}`)

  if(response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot))
  }
}

export const createNewSpot = (data) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if(response.ok) {
    const newSpot = await response.json();
    dispatch(addSpot(newSpot))
  }
}

export const updateSpot = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(editSpot(spot));
    return spot;
  }
};

export const readSpotsByUser = () => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/current`)
  if(response.ok) {
    const spots = await response.json();
    dispatch(load(spots));
  };
};



const initialSate = { allSpots: {}, singleSpot: {} };

// Reducer
const spotReducer = (state = initialSate, action) => {
  switch(action.type) {
    case LOAD:
      const allSpots = {};
      action.payload.Spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return {
        ...state, allSpots: {...allSpots}
      };
    case LOAD_ONE:
      return {
        ...state, singleSpot: {...action.payload}
      }
    case ADD:
      const newState = {...state, allSpots: {...state.allSpots}, singleSpot: {...action.payload}};
      const id = action.payload.id;
      newState.allSpots[id] = action.payload;
      return newState;
    default: return state;
  }
}

export default spotReducer;
