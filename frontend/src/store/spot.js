const LOAD = "spots/LOAD";
const LOAD_ONE = "spot/LOAD_ONE"


// Action
const load = (payload) => ({
  type: LOAD,
  payload
});

const loadOne = (payload) => ({
  type: LOAD_ONE,
  payload
})



// Thunk
export const readSpots = () => async (dispatch) => {

  const response = await fetch(`/api/spots`)

  if(response.ok) {
    const spots = await response.json();
    dispatch(load(spots));
  };
};

export const readOneSpot = (id) => async (dispatch) => {

  const response = await fetch (`/api/spots/${id}`)

  if(response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot))
  }
}

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
      const singleSpot = {};
      return {
        ...state, singleSpot: {...action.payload}
      }

      default: return state;
  }
}

export default spotReducer;
