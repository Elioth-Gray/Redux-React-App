import React from 'react';
import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';

const ThreadLists = ({ threads, upVote, downVote, neutralizeVote }) => {
  return (
    <section className='flex flex-col justify-start items-start w-full gap-4'>
      {threads?.length > 0 ? (
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            {...thread}
            upVote={upVote}
            downVote={downVote}
            neutralizeVote={neutralizeVote}
          />
        ))
      ) : (
        <p className='text-gray-500'>Tidak ada threads yang tersedia</p>
      )}
    </section>
  );
};

// PropTypes for ThreadLists component
ThreadLists.propTypes = {
  threads: PropTypes.array.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadLists;
