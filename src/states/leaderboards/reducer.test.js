/**
 * test scenario for leaderboardsReducer
 *
 *  - leaderboardsReducer function
 *  - Should return initial value when given by unknown action type
 *  - Should return leaderboards when given by RECEIVE_LEADERBOARDS action type
 */

import { describe, expect, it } from 'vitest';
import leaderboardsReducer from './reducer';

describe('leaderboardsReducer function', () => {
  it('Should return initial value when given by unknown action type', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('Should return leaderboards when given by RECEIVE_LEADERBOARDS action type', () => {
    // arrange
    const initalState = [];
    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
        leaderboards: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
        ],
      },
    };

    // action
    const nextState = leaderboardsReducer(initalState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
