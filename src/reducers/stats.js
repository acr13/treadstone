import { fromJS } from 'immutable';

const initialState = fromJS({
  statList: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,20],
});

function statsReducer(state = initialState, { type, payload }) {
  switch (type) {

    default:
      return state;
  }
}


export default statsReducer;
