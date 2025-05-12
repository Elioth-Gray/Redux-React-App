import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <section className="w-full flex flex-col justify-start items-start gap-8">
      {leaderboards?.length > 0 ? (
        leaderboards?.map((leaderboard, index) => (
          <LeaderboardItem
            key={leaderboard.id}
            user={leaderboard.user}
            score={leaderboard.score}
            index={index}
          />
        ))
      ) : (
        <p className="text-gray-500">Tidak ada leaderboards yang tersedia</p>
      )}
    </section>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default LeaderboardList;
