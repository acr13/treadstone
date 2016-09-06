import {
  FETCH_GAME_SUCCESS,
} from '../constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  shots: [],
});

function gameReducer(state = initialState, { type, payload }) {
  switch (type) {

    case FETCH_GAME_SUCCESS:
      return state.update('shots', () => payload);

    default:
      return state;
  }
}

export default gameReducer;
