import { createSelector } from 'reselect';
import DB from '../db/db.json';

const getSelectedTeam = (state) => state.settings.get('selectedTeam');

const NHL_X_MAX = 99;
const NHL_X_MIN = -99;
const NHL_Y_MAX = 42;
const NHL_Y_MIN = -42;

const OUR_X_MAX = 400;
const OUR_X_MIN = 0;
const OUR_Y_MAX = 290;
const OUR_Y_MIN = 0;

/*
function isLow(pt) {
  // 5,27 285,27 285,160 5,160
  if (pt.x >= 5 && pt.x <= 285 && pt.y >= 27 && pt.y <= 160) {
    return true;
  }

  return false;
}
*/

function isMed(pt) {
  // 60,27 230,27 230,120, 200,140, 90,140, 60,120
  // 60,284 90,262, 200,262 230,284 230,377 60,377
  if (pt.y >= 60 && pt.y <= 230 && pt.x >= 27 && pt.x <= 120) {
    return true;
  } else if (pt.y >= 60 && pt.y <= 230 && pt.x >= 284 && pt.x <= 377) {
    return true;
  }

  return false;
}

function isHigh(pt) {
  // 80,27 210,27 210,100, 200,110, 90,110, 80,100
  // 80,304 90,294 200,294 210,304 210,377 80,377
  if (pt.y >= 80 && pt.y <= 210 && pt.x >= 27 && pt.x <= 100) {
    return true;
  } else if (pt.y >= 80 && pt.y <= 210 && pt.x >= 304 && pt.x <= 377) {
    return true;
  }

  return false;
}

function normalize(value, min, max) {
  return Math.abs((value - min) / (max - min));
}

function _convertPt(nhlPoint) {
  const xPercent = normalize(nhlPoint.x, NHL_X_MIN, NHL_X_MAX);
  const destX = xPercent * (Math.abs(OUR_X_MAX - OUR_X_MIN)) + OUR_X_MIN;
  const yPercent = normalize(nhlPoint.y, NHL_Y_MIN, NHL_Y_MAX);
  const destY = yPercent * (Math.abs(OUR_Y_MAX - OUR_Y_MIN)) + OUR_Y_MIN;

  return { x: destX, y: destY};
}

export const getGoals = createSelector(
  [getSelectedTeam],
  (teamId) => {
    const goals = {
      offHigh: 0,
      offMid: 0,
      offLow: 0,
      defHigh: 0,
      defMid: 0,
      defLow: 0,
    };
    let offGoals = 0;
    let defGoals = 0;

    // remove games not played by this team
    DB.games.map((game) => {
      if (game.homeTeamId === teamId || game.awayTeamId === teamId) {
        game.shots.map((play) => {
          // offensive goal
          if (play.team && play.team.id === teamId && play.result.eventTypeId === 'GOAL') {
            const coords = _convertPt(play.coordinates);
            offGoals++;
            if (isHigh(coords)) {
              goals.offHigh++;
            } else if (isMed(coords)) {
              goals.offMid++;
            } else {
              goals.offLow++;
            }
          } else if (play.result.eventTypeId === 'GOAL') {
            const coords = _convertPt(play.coordinates);
            defGoals++;
            if (isHigh(coords)) {
              goals.defHigh++;
            } else if (isMed(coords)) {
              goals.defMid++;
            } else {
              goals.defLow++;
            }
          }
        });
      }
    });

    console.log(goals, offGoals, defGoals);

    return {
      offHigh: goals.offHigh / offGoals,
      offMid: goals.offMid / offGoals,
      offLow: goals.offLow / offGoals,
      defHigh: goals.defHigh / defGoals,
      defMid: goals.defMid / defGoals,
      defLow: goals.defLow / defGoals,
    };
  }
);
