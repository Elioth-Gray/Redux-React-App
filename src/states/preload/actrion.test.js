/**
 * test scenario for preload action
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { afterEach, beforeEach, describe, it, vi, expect } from 'vitest';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import api from '../../utils/api';
import { setAuthUserCreator } from '../auth/action';

const fakeUserProfile = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('asyncPreloadProcess thunk', async () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  it('Should dispatch action correctly when preload success', async () => {
    // arrange
    api.getOwnProfile = () => Promise.resolve(fakeUserProfile);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserCreator(fakeUserProfile));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('Should dispatch action correctly when preload failed', async () => {
    // arrange
    api.getOwnProfile = () => Promise.resolve(fakeUserProfile);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
