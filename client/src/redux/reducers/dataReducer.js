import { cloneDeep } from 'lodash';

import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT
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
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      const screams = cloneDeep(state.screams);
      const index = screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      screams[index] = action.payload;
      const newState = {
        ...state,
        screams
      };
      if (state.scream.screamId === action.payload.screamId) {
        newState.scream = action.payload;
      }
      return newState;
    }
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
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
