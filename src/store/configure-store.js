import { createStore, applyMiddleware, compose } from 'redux';
import logger from './logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promiseMiddleware from '../middleware/promise-middleware';

function configureStore(initialState) {
  const store = compose(
    applyMiddleware(...getMiddlewareWithLogger())
  )(createStore)(rootReducer, initialState);

  _enableHotLoader(store);
  return store;
}

export function getMiddleware() {
  return [
    promiseMiddleware,
    thunk,
    // epicMiddleware,
  ];
}

function getMiddlewareWithLogger() {
  const middleware = getMiddleware();
  middleware.push(logger);
  return middleware;
}

function _enableHotLoader(store) {
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}

export default configureStore;
