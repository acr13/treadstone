import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { fetchStats } from '../api/stats';
import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAIL,
  SWITCH_TEAM,
} from '../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetch(action) {
  try {
    const data = yield call(fetchStats, action.payload);
    yield put({type: FETCH_STATS_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: FETCH_STATS_FAIL, message: e.message});
  }
}

function* mySaga() {
  yield [
    takeEvery(FETCH_STATS_REQUEST, fetch),
    takeEvery(SWITCH_TEAM, fetch)
  ];
}

export default mySaga;
