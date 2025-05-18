import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUserCreator({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserCreator(authUser));
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUserCreator() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserCreator());
    api.putAccessToken('');
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserCreator,
  unsetAuthUserCreator,
  asyncSetAuthUserCreator,
  asyncUnsetAuthUserCreator,
};
