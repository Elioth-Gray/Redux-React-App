/**
 * test scenario for authReducer
 *
 *  - authReducer function
 *  - Should return initial state when given by unknown action type
 *  - Should return new user when given by SET_AUTH_USER action type
 *  - Should return null when given by UNSET_AUTH_USER action type
 */

import { describe, expect, it } from 'vitest';
import authReducer from './reducer';

describe('authReducer function', () => {
  it('Should return initial state when given by unknown action type', () => {
    // assert
    const initalState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authReducer(initalState, action);

    // assert
    expect(nextState).toEqual(initalState);
  });

  it('Should return new user when given by SET_AUTH_USER action type', () => {
    // assert
    const initalState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    // action
    const nextState = authReducer(initalState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('Should return null when given by UNSET_AUTH_USER action type', () => {
    // assert
    const initalState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: 'UNSET_AUTH_USER',
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    // action
    const nextState = authReducer(initalState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
