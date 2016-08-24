import { combineReducers } from 'redux';
import navigator from './navigator';
import breakouts from './breakouts';
import stats from './stats';

const rootReducer = combineReducers({
  navigator,
  breakouts,
  stats,
});

export default rootReducer;
