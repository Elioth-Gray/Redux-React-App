import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import { FaRegComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postedAt, truncateBody } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  const truncatedBody = truncateBody(body);
  const posted = postedAt(createdAt);

  const navigate = useNavigate();
  const isVotedUp = upVotesBy.includes(authUser);
  const isVotedDown = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    if (authUser) {
      upVote(id);
    } else {
      navigate('/login');
    }
  };

  const onDownVoteClick = () => {
    if (authUser) {
      downVote(id);
    } else {
      navigate('/login');
    }
  };

  const onNeutralizeVoteClick = () => {
    if (authUser) {
      neutralizeVote(id);
    } else {
      navigate('/login');
    }
  };

  const onNavigate = () => {
    if (authUser) {
      navigate(`threads/${id}`);
    } else {
      navigate('/login');
    }
  };

  const onKeyDownNavigate = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onNavigate();
    }
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
        <p className="text-sm text-blue-500 font-medium">{`#${category}`}</p>
      </div>
      <div
        className="w-full cursor-pointer"
        onClick={onNavigate}
        onKeyDown={onKeyDownNavigate}
        tabIndex={0}
        role="button"
        aria-label={`View thread: ${title}`}
      >
        <h2 className="text-2xl font-bold">
          {title}
        </h2>
      </div>
      <p className="text-lg text-gray-700">{truncatedBody}</p>
      <div className="flex flex-row justify-start items-center gap-5 mt-2">
        <div className="flex flex-row justify-start items-center gap-2">
          {isVotedUp ? (
            <button
              className="flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-green-400 transition-colors cursor-pointer"
              type="button"
              onClick={onNeutralizeVoteClick}
              aria-label="Remove upvote"
            >
              <FaThumbsUp />
            </button>
          ) : (
            <button
              className="flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-gray-600 transition-colors cursor-pointer"
              type="button"
              onClick={onUpVoteClick}
              aria-label="Upvote this thread"
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
              aria-label="Remove downvote"
            >
              <FaThumbsDown />
            </button>
          ) : (
            <button
              className="flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-gray-600 transition-colors cursor-pointer"
              type="button"
              onClick={onDownVoteClick}
              aria-label="Downvote this thread"
            >
              <FaThumbsDown />
            </button>
          )}
          <p>{downVotesBy.length || 0}</p>
        </div>
        <button
          className="flex flex-row justify-start items-center gap-2 hover:text-blue-500 text-gray-600 transition-colors cursor-pointer"
          type="button"
          onClick={onNavigate}
          aria-label={`View ${totalComments} comments`}
        >
          <FaRegComments />
          <p>{totalComments}</p>
        </button>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = {
  authUser: '',
};

export default ThreadItem;
