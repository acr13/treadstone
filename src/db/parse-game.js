const game = require('./game1');
const rp = require('request-promise');

function leftPad(s) {
  while (s.length < 4) {
    s = '0' + s;
  }

  return s;
}

function getJsonForGameId(id) {
  paddedId = leftPad(id);

  return rp('http://statsapi.web.nhl.com/api/v1/game/201502 ' + paddedId + '/feed/live')
    .then((jsonString) => {
      return JSON.parse(jsonString);
    });
}

const gameId = '1';

for (let i = 0; i < 1; i++) {
  getJsonForGameId(gameId)
    .then((json) => {
      console.log(json);
    });
}


const shimmedGame = {
  homeTeamId: game.gameData.teams.home.id,
  awayTeamId: game.gameData.teams.away.id,
  shots: game.liveData.plays.allPlays.filter((play) => play.result.eventTypeId === 'SHOT'),
};

console.log(shimmedGame.shots.length);
