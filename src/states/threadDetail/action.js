import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionTypes = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UP_VOTE_DETAIL: 'TOGGLE_UP_VOTE_DETAIL',
  TOGGLE_DOWN_VOTE_DETAIL: 'TOGGLE_DOWN_VOTE_DETAIL',

  TOGGLE_NEUTRALIZE_VOTE_DETAIL: 'TOGGLE_NEUTRALIZE_VOTE_DETAIL',
  CREATE_THREAD_COMMENT: 'CREATE_THREAD_COMMENT',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  TOGGLE_NEUTRALIZE_VOTE_COMMENT: 'TOGGLE_NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionTypes.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionTypes.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_UP_VOTE_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_DOWN_VOTE_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralizeVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionTypes.TOGGLE_NEUTRALIZE_VOTE_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function createCommentsActionCreator(comment) {
  return {
    type: ActionTypes.CREATE_THREAD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionTypes.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionTypes.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleNeutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionTypes.TOGGLE_NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetailActionController(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.GetDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThreadDetailActionCreator(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
    );
    dispatch(showLoading());
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error);
      dispatch(
        toggleUpVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadDetailActionCreator(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
    );
    dispatch(showLoading());

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error);
      dispatch(
        toggleDownVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThreadDetailActionCreator(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralizeVoteThreadDetailActionCreator({
        threadId,
        userId: authUser.id,
      }),
    );
    dispatch(showLoading());

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error);
      dispatch(
        toggleNeutralizeVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncCreateCommentActionCreator({ content }) {
  return async (dispatch, getState) => {
    const { threadDetail } = getState();
    dispatch(showLoading());
    try {
      const comment = await api.createComments({
        content,
        id: threadDetail.id,
      });
      dispatch(createCommentsActionCreator(comment));
    } catch (error) {
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteCommentActionCreator(commentId) {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(
      toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }),
    );
    dispatch(showLoading());
    try {
      await api.upVoteThreadComment({
        threadId: threadDetail.id,
        commentId,
      });
    } catch (error) {
      alert(error);
      dispatch(
        toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteCommentActionCreator(commentId) {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(
      toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }),
    );
    dispatch(showLoading());
    try {
      await api.downVoteThreadComment({
        threadId: threadDetail.id,
        commentId,
      });
    } catch (error) {
      alert(error);
      dispatch(
        toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncToggleNeutralizeUpVoteCommentActionCreator(commentId) {
  return async (dispatch, getState) => {
    const { threadDetail, authUser } = getState();
    dispatch(
      toggleNeutralizeVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
      }),
    );
    dispatch(showLoading());
    try {
      await api.neutralizeVoteThreadComment({
        threadId: threadDetail.id,
        commentId,
      });
    } catch (error) {
      alert(error);
      dispatch(
        toggleNeutralizeVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        }),
      );
    }
    dispatch(hideLoading());
  };
}

export {
  ActionTypes,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncDownVoteThreadDetailActionCreator,
  asyncNeutralizeVoteThreadDetailActionCreator,
  asyncReceiveThreadDetailActionController,
  asyncUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralizeVoteThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  createCommentsActionCreator,
  asyncCreateCommentActionCreator,
  asyncToggleNeutralizeUpVoteCommentActionCreator,
  asyncToggleDownVoteCommentActionCreator,
  asyncToggleUpVoteCommentActionCreator,
};
