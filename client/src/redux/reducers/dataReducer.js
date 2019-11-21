import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function dataReducer(state = initialState, action) {
  switch (action.payload) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      const index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      const screams = state.screams.reduce((accumulator, prevValue) => {
        accumulator.push(prevValue);
        return accumulator
      }, []);
      screams[index] = action.payload;
      return {
        ...state,
        screams
      }
    default:
      return state;
  }
}
