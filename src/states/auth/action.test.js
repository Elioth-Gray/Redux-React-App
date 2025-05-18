/**
 * test scenario for auth action
 *
 * - asyncSetAuthUserCreator thunk
 *  - should dispatch action correctly when login success
 *  - should throw error when login fails
 *
 * - asyncUnsetAuthUserCreator thunk
 *  - should dispatch action correctly when data fetching success
 *
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  asyncSetAuthUserCreator,
  asyncUnsetAuthUserCreator,
  setAuthUserCreator,
  unsetAuthUserCreator,
} from './action';
import api from '../../utils/api';

const fakeLoginResponse = 'fake-access-token';
const fakeUserProfile = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Something went wrong!');

describe('asyncSetAuthUserrCreator thunk', async () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('Should dispatch action correctly when login success', async () => {
    // arrange
    api.login = vi.fn(() => Promise.resolve(fakeLoginResponse));
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn(() => Promise.resolve(fakeUserProfile));

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUserCreator({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeLoginResponse);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserCreator(fakeUserProfile));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should throw error when login fails', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    const thunk = asyncSetAuthUserCreator({
      email: 'john@example.com',
      password: 'wrong-password',
    });

    // assert
    await expect(thunk(dispatch)).rejects.toThrow(fakeErrorResponse);
  });
});

describe('asyncUnsetAuthUserrCreator thunk', async () => {
  beforeEach(() => {
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.putAccessToken = api._putAccessToken;

    delete api._putAccessToken;
  });

  it('Should dispatch action correctly when logout success', async () => {
    // arrange
    api.putAccessToken = vi.fn();
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncUnsetAuthUserCreator()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
