import { fromJS } from 'immutable';
import {
  FETCH_STATS_SUCCESS,
  // FETCH_STATS_FAIL,
} from '../constants';

const initialState = fromJS({
  statList: [],
});

function statsReducer(state = initialState, { type, payload }) {
  switch (type) {

    case FETCH_STATS_SUCCESS:
      return state.merge({
        statList: payload.data,
      });

    default:
      return state;
  }
}


export default statsReducer;
