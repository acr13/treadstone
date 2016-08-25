import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { fetchStats } from '../api/stats';
import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAIL,
} from '../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const data = yield call(fetchStats, action.payload);
    yield put({type: FETCH_STATS_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: FETCH_STATS_FAIL, message: e.message});
  }
}

function* mySaga() {
  yield* takeEvery(FETCH_STATS_REQUEST, fetchUser);
}

export default mySaga;
