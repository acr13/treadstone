const rp = require('request-promise');
const fs = require('fs');

let GAMES_SAVED = 0;
const GAMES_SAVE_MAX = 15;
const FILE_TO_SAVE = './db.json';
const GAMES_TO_SAVE = [];

const SUPPORTED_EVENTS = {
  'MISSED_SHOT': 1,
  'BLOCKED_SHOT': 1,
  'SHOT': 1,
  'GOAL': 1,
};

function leftPad(s) {
  s = s + '';

  while (s.length < 4) {
    s = '0' + s;
  }

  return s;
}

function isGoodGame(gameJson) {
  if (gameJson.gameData.teams.home.id === 10 || gameJson.gameData.teams.away.id === 10 ||
    gameJson.gameData.teams.home.id === 17 || gameJson.gameData.teams.away.id === 17 ||
    gameJson.gameData.teams.home.id === 6 || gameJson.gameData.teams.away.id === 6) {
    return true;
  }

  return false;
}

function saveDbToFile() {
  fs.writeFileSync(FILE_TO_SAVE, JSON.stringify(GAMES_TO_SAVE));
}

function getJsonForGameId(id) {
  paddedId = leftPad(id);

  return rp('http://statsapi.web.nhl.com/api/v1/game/201601 ' + paddedId + '/feed/live')
    .then((jsonString) => JSON.parse(jsonString))
    .then((json) => {
      if (isGoodGame(json)) {
        GAMES_TO_SAVE.push({
          homeTeamId: json.gameData.teams.home.id,
          awayTeamId: json.gameData.teams.away.id,
          shots: json.liveData.plays.allPlays.filter((play) => SUPPORTED_EVENTS[play.result.eventTypeId]),
        });
        GAMES_SAVED++;
      }

      return true;
    });
}

function fetch(gameId) {
  getJsonForGameId(gameId)
    .then((status) => {
      console.log('status', status, GAMES_SAVED);
      if (GAMES_SAVED === GAMES_SAVE_MAX) {
        saveDbToFile();
        process.exit();
      } else {
        gameId++;
        fetch(gameId);
      }
    });
}

const gameId = '1';
fetch(gameId);
