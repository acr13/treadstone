import { createSelector } from 'reselect';
// import DB from '../db/shots';
import game1 from '../db/game1';

const getSelectedTeam = (state) => state.settings.get('selectedTeam');

export const getShots = createSelector(
  [getSelectedTeam],
  (teamId) => {
    const shots = [];

    // remove games not played by this team
    /*
    const games = DB.filter((game) => {
      return game.homeTeamId === teamId || game.awayTeamId === teamId;
    });
    */

    // only include shots by this team
    game1.liveData.plays.allPlays.map((play) => {
      if (play.result.eventTypeId === 'SHOT' && play.team && play.team.id === teamId) {
        shots.push(play);
      }

      // game.shots.map((shot) => {
      // console.log(shot);
      // });
    });

    return shots;
  }
);
