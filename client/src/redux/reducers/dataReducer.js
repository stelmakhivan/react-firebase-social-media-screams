import { cloneDeep } from 'lodash';

import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM
} from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      const screams = cloneDeep(state.screams);
      const index = screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      screams[index] = action.payload;
      return {
        ...state,
        screams
      };
    }
    case DELETE_SCREAM: {
      const screams = cloneDeep(state.screams);
      const index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      screams.splice(index, 1);
      return {
        ...state,
        screams
      };
    }
    case POST_SCREAM: {
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    }
    default:
      return state;
  }
}
