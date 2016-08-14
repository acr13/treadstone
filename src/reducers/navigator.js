import { PUSH_ROUTE, POP_ROUTE, JUMP_TO_ROUTE } from '../constants';
import { NavigationExperimental } from 'react-native';
import { SCENES } from '../constants';

const { StateUtils: NavigationStateUtils } = NavigationExperimental;

const initialState = {
  index: 0,
  key: 'root',
  routes: [{
    key: SCENES.HOME,
  }],
};

function navigatorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case PUSH_ROUTE:
      if (state.routes[state.index].key === (payload && payload.key)) {
        return state;
      }
      return NavigationStateUtils.push(state, payload);

    case POP_ROUTE:
      if (state.index === 0 || state.routes.length === 1) {
        return state;
      }
      return NavigationStateUtils.pop(state);

    case JUMP_TO_ROUTE:
      if (NavigationStateUtils.indexOf(state, payload.key) === -1) {
        return NavigationStateUtils.push(state, payload);
      }
      return NavigationStateUtils.jumpTo(state, payload.key);

    default:
      return state;
  }
}

export default navigatorReducer;
