import { FETCH_GAME_REQUEST } from '../constants';

export function apiFetchGame(gameId) {
  return {
    type: FETCH_GAME_REQUEST,
    payload: gameId,
  };
}
