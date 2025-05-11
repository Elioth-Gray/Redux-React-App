import React from 'react';
import LeaderboardItem from './LeaderboardItem';
import PropTypes from 'prop-types';

const LeaderboardList = ({ leaderboards }) => {
  return (
    <section className='w-full flex flex-col justify-start items-start gap-8'>
      {leaderboards?.length > 0 ? (
        leaderboards?.map((leaderboard, index) => {
          return (
            <LeaderboardItem
              key={leaderboard.id}
              {...leaderboard}
              index={index}
            ></LeaderboardItem>
          );
        })
      ) : (
        <p className='text-gray-500'>Tidak ada leaderboards yang tersedia</p>
      )}
    </section>
  );
};

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LeaderboardList;
