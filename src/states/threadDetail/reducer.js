import { ActionTypes } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionTypes.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionTypes.CLEAR_THREAD_DETAIL:
      return null;

    case ActionTypes.CREATE_THREAD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };

    case ActionTypes.TOGGLE_UP_VOTE_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy.concat(action.payload.userId),
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          )
          : threadDetail.downVotesBy,
      };

    case ActionTypes.TOGGLE_DOWN_VOTE_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          )
          : threadDetail.downVotesBy.concat(action.payload.userId),
      };

    case ActionTypes.TOGGLE_NEUTRALIZE_VOTE_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: threadDetail.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };

    case ActionTypes.TOGGLE_UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat(action.payload.userId),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                  (id) => id !== action.payload.userId,
                )
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };

    case ActionTypes.TOGGLE_DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                  (id) => id !== action.payload.userId,
                )
                : comment.downVotesBy.concat(action.payload.userId),
            };
          }
          return comment;
        }),
      };

    case ActionTypes.TOGGLE_NEUTRALIZE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => ({
          ...comment,
          upVotesBy: comment.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
          downVotesBy: comment.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        })),
      };

    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
