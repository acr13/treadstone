import { combineReducers } from 'redux';
import navigator from './navigator';
import breakouts from './breakouts';
import stats from './stats';
import goals from './goals';

const rootReducer = combineReducers({
  navigator,
  breakouts,
  stats,
  goals,
});

export default rootReducer;
