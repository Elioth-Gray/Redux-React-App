import PropTypes from 'prop-types';

function LeaderboardItem({ user, score, index }) {
  return (
    <div className="w-full flex flex-row justify-between px-8 py-6 border border-gray-400 shadow-sm rounded-lg">
      <div className="flex flex-row justify-start items-center gap-5">
        <p className="font-semibold text-lg">{index + 1}</p>
        <img
          className="size-10 rounded-full bg-amber-400"
          src={user?.avatar}
          alt="User Avatar"
        />
        <p className="font-semibold text-lg">{user?.name}</p>
      </div>
      <div className="flex flex-row justify-start items-center gap-5">
        <p className="text-lg font-semibold">Skor: </p>
        <p className="font-semibold text-xl text-[#3498DB]">{score}</p>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default LeaderboardItem;
