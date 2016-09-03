import { SWITCH_TEAM } from '../constants';

export function actionSwitchTeam(team) {
  return {
    type: SWITCH_TEAM,
    payload: team,
  };
}
