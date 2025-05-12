import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { asyncReceiveLeaderboardsActionCreator } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';

function LeaderboardsPage() {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboardsActionCreator());
  }, [dispatch]);

  return (
    <section className="min-h-screen w-full bg-[#F8F9FA]">
      <Navbar />
      <section className="flex flex-col justify-start items-start mx-auto max-w-5xl px-4 py-8 gap-10">
        <section className="flex flex-row justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Leaderboards</h1>
        </section>
        <LeaderboardList leaderboards={leaderboards} />
      </section>
    </section>
  );
}

export default LeaderboardsPage;
