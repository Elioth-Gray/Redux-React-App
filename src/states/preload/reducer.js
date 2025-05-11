/**
 * @TODO: Define reducer for the isPreLoad state
 */
import { ActionTypes } from './action';

function isPreloadReducer(isPreload = true, action = {}) {
  switch (action.type) {
    case ActionTypes.SET_IS_PRELOAD:
      return action.payload.isPreload;

    default:
      return isPreload;
  }
}

export default isPreloadReducer;
