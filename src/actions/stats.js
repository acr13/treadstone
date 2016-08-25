import { FETCH_STATS_REQUEST } from '../constants';

export function apiFetchStats() {
  return {
    type: FETCH_STATS_REQUEST,
  };
}
