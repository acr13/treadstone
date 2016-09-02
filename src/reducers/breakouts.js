import {
  SWITCH_PLAY,
  SWITCH_EVENT,
  START_ANIMATION,
  STOP_ANIMATION,
} from '../constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  TIME_OF_EVENTS: 1000,
  currentPlay: '',
  currentEvent: 1,
  isAnimating: false,
  plays: ['1', '2', '3'],
});

function breakoutReducer(state = initialState, { type, payload }) {
  switch (type) {

    case SWITCH_PLAY:
      return state.update('currentPlay', () => payload);

    case SWITCH_EVENT:
      return state.update('currentEvent', () => payload);

    case START_ANIMATION:
      return state.update('isAnimating', () => true);

    case STOP_ANIMATION:
      return state.update('isAnimating', () => false);

    default:
      return state;
  }
}

export default breakoutReducer;
