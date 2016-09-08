import { createSelector } from 'reselect';
import DB from '../db/db.json';
// import game1 from '../db/game1';

const getSelectedTeam = (state) => state.settings.get('selectedTeam');

export const getShots = createSelector(
  [getSelectedTeam],
  (teamId) => {
    const shots = [];

    // remove games not played by this team
    DB.games.map((game) => {
      if (game.homeTeamId === teamId || game.awayTeamId === teamId) {
        game.shots.map((play) => {
          if (play.result.eventTypeId === 'SHOT' && play.team && play.team.id === teamId) {
            shots.push(play);
          }
        });
      }
    });

    return shots;
  }
);
