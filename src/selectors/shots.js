import { createSelector } from 'reselect';
import DB from '../db/db.json';
// import game1 from '../db/game1';

const getSelectedTeam = (state) => state.settings.get('selectedTeam');
const DISTANCE_THRESHOLD = 5;

const distanceBetweenPoints = (pt1, pt2) => {
  return Math.sqrt(Math.pow((pt2.x - pt1.x), 2) + Math.pow((pt2.y - pt1.y), 2));
};

const nearestPoint = (pt, shotMap) => {
  const l = shotMap.length;
  for (let i = 0; i < l; i++) {
    if (distanceBetweenPoints(pt, shotMap[i].coordinates) <= DISTANCE_THRESHOLD) {
      return i;
    }
  }

  return -1;
};

export const getShots = createSelector(
  [getSelectedTeam],
  (teamId) => {
    const shots = [];

    // remove games not played by this team
    DB.games.map((game) => {
      if (game.homeTeamId === teamId || game.awayTeamId === teamId) {
        game.shots.map((play) => {
          if (play.team && play.team.id === teamId) {
            const nearPt = nearestPoint(play.coordinates, shots);
            // console.log(nearPt);
            if (nearPt !== -1) {
              // console.log(shots[nearPt])
              shots[nearPt].count++;
            } else {
              play.count = 0;
              shots.push(play);
            }
          }
        });
      }
    });

    return shots;
  }
);
