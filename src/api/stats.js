export function get(url) {
  return fetch(url)
    .then((resp) => {
      return resp;
    })
    .then((response) => response.json())
    .catch((err) => err);
}


export function fetchStats(payload) {
  if (!payload) {
    payload = 10;
  }

  return get('http://www.nhl.com/stats/rest/grouped/skaters/enhanced/season/skatersummaryshooting?'
    + 'cayenneExp=seasonId=20152016%20and%20gameTypeId=2%20and%20teamId=' + payload)
    .then((json) => {
      json.data = json.data.sort(compare);
      return json;
    });
}

function compare(a, b) {
  if (a.shotAttempts < b.shotAttempts) {
    return 1;
  } else if (a.shotAttempts > b.shotAttempts) {
    return -1;
  }

  return 0;
}
