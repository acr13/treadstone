function get(url) {
  return fetch(url)
    .then((resp) => {
      return resp;
    })
    .then((response) => response.json())
    .catch((err) => err);
}


export function getGameLog(gameId) {
  const url = 'http://statsapi.web.nhl.com/api/v1/game/' + gameId + '/feed/live';
  return get(url);
}
