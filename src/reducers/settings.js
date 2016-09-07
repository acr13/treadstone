import {
  SWITCH_TEAM,
} from '../constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  selectedTeam: 28,
});

function goalsReducer(state = initialState, { type, payload }) {
  switch (type) {

    case SWITCH_TEAM:
      return state.update('selectedTeam', () => payload);

    default:
      return state;
  }
}

export default goalsReducer;
