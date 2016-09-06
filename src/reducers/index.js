import { combineReducers } from 'redux';
import navigator from './navigator';
import breakouts from './breakouts';
import stats from './stats';
import goals from './goals';
import settings from './settings';
import game from './game';

const rootReducer = combineReducers({
  navigator,
  breakouts,
  stats,
  goals,
  settings,
  game,
});

export default rootReducer;
