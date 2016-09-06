import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { getGameLog } from '../api/game';
import { Set } from 'immutable';
import {
  FETCH_GAME_REQUEST,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_FAIL,
} from '../constants';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchGame(action) {
  try {
    const data = yield call(getGameLog, action.payload);

    // TODO refactor into subroutines folder
    const playTypes = new Set();

    const shotPlays = data.liveData.plays.allPlays.filter((play) => {
      const type = play.result.eventTypeId;
      playTypes = playTypes.add(type);
      return type === 'SHOT';
    });

    yield put({type: FETCH_GAME_SUCCESS, payload: shotPlays});
  } catch (e) {
    yield put({type: FETCH_GAME_FAIL, message: e.message});
  }
}

function* mySaga() {
  yield* takeEvery(FETCH_GAME_REQUEST, fetchGame);
}

export default mySaga;
