import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionTypes = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREADS: 'ADD_THREADS',
  TOGGLE_DOWN_VOTE: 'TOGGLE_DOWN_VOTE',
  TOGGLE_UP_VOTE: 'TOGGLE_UP_VOTE',
  NEUTRALIZE_VOTE: 'NEUTRALIZE_VOTE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionTypes.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionTypes.ADD_THREADS,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_UP_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_DOWN_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralizeVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionTypes.NEUTRALIZE_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncCreateThreadActionCreator({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThreadActionCreator(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toggleUpVoteActionCreator({ threadId, userId: authUser.id }));
    dispatch(showLoading());
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteActionCreator({ threadId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadActionCreator(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownVoteActionCreator({ threadId, userId: authUser.id }));
    dispatch(showLoading());
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteActionCreator({ threadId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThreadActionCreator(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralizeVoteActionCreator({ threadId, userId: authUser.id }),
    );
    dispatch(showLoading());
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralizeVoteActionCreator({ threadId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

export {
  ActionTypes,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  toggleDownVoteActionCreator,
  toggleUpVoteActionCreator,
  toggleNeutralizeVoteActionCreator,
  asyncCreateThreadActionCreator,
  asyncUpVoteThreadActionCreator,
  asyncDownVoteThreadActionCreator,
  asyncNeutralizeVoteThreadActionCreator,
};
