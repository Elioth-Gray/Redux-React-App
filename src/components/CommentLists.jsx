import PropTypes from 'prop-types';
import ThreadComment from './ThreadComment';

function CommentLists({
  comments,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  return (
    <section className="flex flex-col justify-start items-start w-full gap-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <ThreadComment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            owner={comment.owner}
            upVotesBy={comment.upVotesBy}
            downVotesBy={comment.downVotesBy}
            authUser={authUser}
            upVote={upVote}
            downVote={downVote}
            neutralizeVote={neutralizeVote}
          />
        ))
      ) : (
        <p className="text-gray-500">Tidak ada comments yang tersedia</p>
      )}
    </section>
  );
}

CommentLists.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

CommentLists.defaultProps = {
  comments: [],
  authUser: null,
};

export default CommentLists;
