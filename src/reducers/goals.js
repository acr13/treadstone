import {
  SWITCH_TEAM,
} from '../constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  rates: {
    high: 0.75,
    mid: 0.18,
    low: 0.07,
  },
});

function goalsReducer(state = initialState, { type }) {
  switch (type) {

    case SWITCH_TEAM:
      return state.merge({
        rates: {
          high: Math.random(),
          mid: Math.random(),
          low: Math.random(),
        },
      });

    default:
      return state;
  }
}

export default goalsReducer;
