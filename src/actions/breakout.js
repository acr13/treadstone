import {
  STOP_ANIMATION,
  START_ANIMATION,
  SWITCH_EVENT,
  SWITCH_PLAY,
} from '../constants';

export function actionSwitchBreakout(play) {
  return { type: SWITCH_PLAY, payload: play};
}

export function actionSwitchEvent(eventNum) {
  return { type: SWITCH_EVENT, payload: eventNum};
}

export function actionStopAnimation() {
  return { type: STOP_ANIMATION };
}

export function actionStartAnimation() {
  return { type: START_ANIMATION };
}
