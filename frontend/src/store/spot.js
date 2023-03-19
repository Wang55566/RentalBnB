import { csrfFetch } from './csrf';

const LOAD = "spots/LOAD";
const LOAD_ONE = "spot/LOAD_ONE";
const ADD = "spot/CREATE";
const EDIT = "spot/EDIT";
const DELETE = "spot/DELETE"

// Action
const load = (payload) => ({
  type: LOAD,
  payload
});

const loadOne = (payload) => ({
  type: LOAD_ONE,
  payload
});

const addSpot = (payload, image) => ({
  type: ADD,
  payload,
  image
});

const editSpot = (payload) => ({
  type: EDIT,
  payload
});

const deleteSpot = (payload) => ({
  type: DELETE,
  payload
})

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

  // console.log("data:",data);
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })

  if(response.ok) {

    const newSpot = await response.json();
    // Image
    // const ImageArray = [];
    // ImageArray.push(data.previewImage);

    const previewImage = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url : data.previewImage,
        })
      })
      const previewImage1 = await previewImage.json()
    //
    return dispatch(addSpot(newSpot, previewImage1))
  }
}

export const updateSpot = (data, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spot = await response.json();
    return dispatch(editSpot(spot));
  }
};

export const readSpotsByUser = () => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/current`)
  if(response.ok) {
    const spots = await response.json();
    dispatch(load(spots));
  };
};

export const deleteASpot = (spotId) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "delete",
  });

  if (response.ok) {
    dispatch(deleteSpot(spotId))
  }
};


const initialSate = { allSpots: {}, singleSpot: {} };

// Reducer
const spotReducer = (state = initialSate, action) => {
  switch(action.type) {
    case LOAD:
        const allSpots = {};
        action.payload.Spots.forEach( (spot) => {
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
      console.log(action.payload)
      const newState = {...state, allSpots: {...state.allSpots}};
      const id = action.payload.id;
      newState.allSpots[id] = action.payload;
      return newState;
    case DELETE:
      const deletedState = {...state, allSpots: {...state.allSpots}}
      delete deletedState.allSpots[action.payload.id];
      return deletedState;
    default: return state;
  }
}

export default spotReducer;
