export function get(url) {
  return fetch(url)
    .then((resp) => {
      return resp;
    })
    .then((response) => response.json())
    .catch((err) => err);
}


export function fetchStats() {
  return get('http://www.nhl.com/stats/rest/grouped/skaters/enhanced/season/skatersummaryshooting?'
    + 'cayenneExp=seasonId=20152016%20and%20gameTypeId=2%20and%20teamId=10');
}
