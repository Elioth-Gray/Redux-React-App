import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import { FaRegComments } from 'react-icons/fa';
import { postedAt, truncateBody } from '../utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const ThreadItem = ({
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
}) => {
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

  return (
    <div className='flex flex-col justify-start items-start rounded-md px-6 py-6 bg-white w-full border border-gray-200 shadow-sm gap-3'>
      <div className='flex flex-row justify-start items-center gap-3'>
        <img
          className='size-10 rounded-full bg-gray-400 flex flex-col justify-center items-center text-white font-bold'
          src={owner?.avatar}
        ></img>
        <p className='font-semibold text-lg'>{owner?.name}</p>
        <p className='text-sm text-gray-500'>{posted}</p>
        <p className='text-sm text-blue-500 font-medium'>{`#${category}`}</p>
      </div>
      <h2 className='text-2xl font-bold cursor-pointer' onClick={onNavigate}>
        {title}
      </h2>
      <p className='text-lg text-gray-700'>{truncatedBody}</p>
      <div className='flex flex-row justify-start items-center gap-5 mt-2'>
        <div className='flex flex-row justify-start items-center gap-2'>
          {isVotedUp ? (
            <>
              <button
                className='flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-green-400 transition-colors cursor-pointer'
                type='button'
                onClick={onNeutralizeVoteClick}
              >
                <FaThumbsUp />
              </button>
            </>
          ) : (
            <>
              <button
                className='flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-gray-600 transition-colors cursor-pointer'
                type='button'
                onClick={onUpVoteClick}
              >
                <FaThumbsUp />
              </button>
            </>
          )}
          <p>{upVotesBy.length || 0}</p>
        </div>
        <div className='flex flex-row justify-start items-center gap-2'>
          {isVotedDown ? (
            <>
              <button
                className='flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-red-400 transition-colors cursor-pointer'
                type='button'
                onClick={onNeutralizeVoteClick}
              >
                <FaThumbsDown />
              </button>
            </>
          ) : (
            <>
              <button
                className='flex justify-center items-center rounded-full hover:bg-gray-100 p-2 text-gray-600 transition-colors cursor-pointer'
                type='button'
                onClick={onDownVoteClick}
              >
                <FaThumbsDown />
              </button>
            </>
          )}
          <p>{downVotesBy.length || 0}</p>
        </div>
        <button
          className='flex flex-row justify-start items-center gap-2 hover:text-blue-500 text-gray-600 transition-colors cursor-pointer'
          type='button'
          onClick={onNavigate}
        >
          <FaRegComments />
          <p>{totalComments}</p>
        </button>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.object.isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadItem;
