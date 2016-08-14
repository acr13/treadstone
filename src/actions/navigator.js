import {
  JUMP_TO_ROUTE,
  POP_ROUTE,
  PUSH_ROUTE,
} from '../constants';

export function push(route) {
  return {
    type: PUSH_ROUTE,
    payload: route,
  };
}

export function pop() {
  return {
    type: POP_ROUTE,
  };
}

export function jumpTo(route) {
  return {
    type: JUMP_TO_ROUTE,
    payload: route,
  };
}
