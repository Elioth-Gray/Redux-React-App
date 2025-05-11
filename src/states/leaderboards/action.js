import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionTypes = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLearboardsActionCreator(leaderboards) {
  return {
    type: ActionTypes.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboardsActionCreator() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLearboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionTypes,
  receiveLearboardsActionCreator,
  asyncReceiveLeaderboardsActionCreator,
};
