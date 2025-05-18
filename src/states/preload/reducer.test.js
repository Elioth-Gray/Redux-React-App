/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - Should return initial state when given by unknown action type
 *  - Should return action isPreload state when given by SET_IS_PRELOAD action type
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('Should return initial state when given by unknown action type', () => {
    // arrange
    const initalState = true;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = isPreloadReducer(initalState, action);

    // assert
    expect(nextState).toEqual(initalState);
  });

  it('Should return action isPreload state when given by SET_IS_PRELOAD action type', () => {
    // arrange
    const initalState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: true,
      },
    };

    // action
    const nextState = isPreloadReducer(initalState, action);

    // assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});
