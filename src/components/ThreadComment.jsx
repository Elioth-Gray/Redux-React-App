import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';

function ThreadComment({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  const posted = postedAt(createdAt);

  const isVotedUp = upVotesBy.includes(authUser);
  const isVotedDown = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    upVote(id);
  };

  const onDownVoteClick = () => {
    downVote(id);
  };

  const onNeutralizeVoteClick = () => {
    neutralizeVote(id);
  };

  return (
    <div className="flex flex-col justify-start items-start rounded-md px-6 py-6 bg-white w-full border border-gray-200 shadow-sm gap-3">
      <div className="flex flex-row justify-start items-center gap-3">
        <img
          className="size-10 rounded-full bg-gray-400 flex flex-col justify-center items-center text-white font-bold"
          src={owner?.avatar}
          alt={`${owner?.name}'s avatar`}
        />
        <p className="font-semibold text-lg">{owner?.name}</p>
        <p className="text-sm text-gray-500">{posted}</p>
      </div>
      <p className="text-lg text-gray-700">{content}</p>
      <div className="flex flex-row justify-start items-center gap-5 mt-2">
        <div className="flex flex-row justify-start items-center gap-2">
          {isVotedUp ? (
            <>
              {' '}
              <button
                className="flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-green-400 transition-colors cursor-pointer"
                type="button"
                onClick={onNeutralizeVoteClick}
              >
                <FaThumbsUp />
              </button>
            </>
          ) : (
            <button
              className="flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-gray-600 transition-colors cursor-pointer"
              type="button"
              onClick={onUpVoteClick}
            >
              <FaThumbsUp />
            </button>
          )}
          <p>{upVotesBy.length || 0}</p>
        </div>
        <div className="flex flex-row justify-start items-center gap-2">
          {isVotedDown ? (
            <button
              className="flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-red-400 transition-colors cursor-pointer"
              type="button"
              onClick={onNeutralizeVoteClick}
            >
              <FaThumbsDown />
            </button>
          ) : (
            <button
              className="flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-gray-600 transition-colors cursor-pointer"
              type="button"
              onClick={onDownVoteClick}
            >
              <FaThumbsDown />
            </button>
          )}
          <p>{downVotesBy.length || 0}</p>
        </div>
      </div>
    </div>
  );
}

ThreadComment.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

ThreadComment.defaultProps = {
  upVotesBy: [],
  downVotesBy: [],
  authUser: '',
};

export default ThreadComment;
