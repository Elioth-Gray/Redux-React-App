import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboardsActionCreator } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';

const LeaderboardsPage = () => {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboardsActionCreator());
    console.log(leaderboards);
  }, [dispatch]);

  return (
    <section className='min-h-screen w-full bg-[#F8F9FA]'>
      <Navbar />
      <section className='flex flex-col justify-start items-start mx-auto max-w-5xl px-4 py-8 gap-10'>
        <section className='flex flex-row justify-between items-center w-full'>
          <h1 className='text-2xl font-bold'>Leaderboards</h1>
        </section>
        <LeaderboardList leaderboards={leaderboards}></LeaderboardList>
      </section>
    </section>
  );
};

export default LeaderboardsPage;
