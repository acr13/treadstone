import {
  REQUEST,
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
} from '../constants';

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (action.type !== REQUEST) {
      return next(action);
    }

    const { requestType, promise, data } = action.payload;

   /**
    * Dispatch the pending action
    */
    dispatch({
      type: REQUEST_START,
      payload: { requestType, ...data},
    });

    /**
     * If successful, dispatch the fulfilled action, otherwise dispatch
     * rejected action.
     */
    return promise.then(
      () => {
        dispatch({
          type: REQUEST_SUCCESS,
          payload: { requestType },
        });
      },
      error => {
        dispatch({
          type: REQUEST_FAIL,
          payload: {
            errors: error,
            requestType,
          },
        });
      }
    );
  };
}
