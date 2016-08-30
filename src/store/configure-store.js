import { createStore, applyMiddleware, compose } from 'redux';
import logger from './logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import promiseMiddleware from '../middleware/promise-middleware';

// sagas
import statsSaga from '../sagas/stats';

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  const store = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(...getMiddlewareWithLogger())
  )(createStore)(rootReducer, initialState);

  sagaMiddleware.run(statsSaga);

  _enableHotLoader(store);
  return store;
}

export function getMiddleware() {
  return [
    promiseMiddleware,
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
