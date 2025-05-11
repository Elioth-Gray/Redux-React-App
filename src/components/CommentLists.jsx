import React from 'react';
import ThreadComment from './ThreadComment';
import PropTypes from 'prop-types';

const CommentLists = ({
  comments,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) => {
  return (
    <section className='flex flex-col justify-start items-start w-full gap-4'>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <ThreadComment
            key={comment.id}
            {...comment}
            authUser={authUser}
            upVote={upVote}
            downVote={downVote}
            neutralizeVote={neutralizeVote}
          />
        ))
      ) : (
        <p className='text-gray-500'>Tidak ada comments yang tersedia</p>
      )}
    </section>
  );
};

CommentLists.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    owner: PropTypes.object,
    upVotesBy: PropTypes.array,
    downVotesBy: PropTypes.array,
  })),
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default CommentLists;
