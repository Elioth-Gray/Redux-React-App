import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadLists({
  threads, upVote, downVote, neutralizeVote,
}) {
  return (
    <section className="flex flex-col justify-start items-start w-full gap-4">
      {threads?.length > 0 ? (
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            id={thread.id}
            title={thread.title}
            body={thread.body}
            category={thread.category}
            createdAt={thread.createdAt}
            totalComments={thread.totalComments}
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            owner={thread.owner}
            authUser={thread.authUser}
            upVote={upVote}
            downVote={downVote}
            neutralizeVote={neutralizeVote}
          />
        ))
      ) : (
        <p className="text-gray-500">Tidak ada threads yang tersedia</p>
      )}
    </section>
  );
}

ThreadLists.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      totalComments: PropTypes.number,
      upVotesBy: PropTypes.arrayOf(PropTypes.string),
      downVotesBy: PropTypes.arrayOf(PropTypes.string),
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }),
      authUser: PropTypes.string,
    }),
  ).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadLists;
