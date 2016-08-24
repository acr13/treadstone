import { fromJS } from 'immutable';

const initialState = fromJS({
  TIME_OF_EVENTS: 1000,
});

function breakoutReducer(state = initialState, { type, payload }) {
  switch (type) {

    default:
      return state;
  }
}

export default breakoutReducer;
