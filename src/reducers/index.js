import { combineReducers } from 'redux';
import navigator from './navigator';
import breakouts from './breakouts';
import stats from './stats';
import goals from './goals';
import settings from './settings';

const rootReducer = combineReducers({
  navigator,
  breakouts,
  stats,
  goals,
  settings,
});

export default rootReducer;
