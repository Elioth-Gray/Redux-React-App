import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ThreadLists from '../components/ThreadLists';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import {
  asyncUpVoteThreadActionCreator,
  asyncDownVoteThreadActionCreator,
  asyncNeutralizeVoteThreadActionCreator,
} from '../states/threads/action';

function HomePage() {
  const { threads = [], users = [] } = useSelector((states) => states);
  const { authUser } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const filteredThreads = category === 'semua' || !category
    ? threads
    : threads.filter((thread) => thread.category === category);

  const threadsList = filteredThreads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser ? authUser.id : null,
  }));

  const uniqueCategories = [
    ...new Set(threads.map((thread) => thread.category)),
  ];

  const onUpVoteThread = (id) => {
    dispatch(asyncUpVoteThreadActionCreator(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncDownVoteThreadActionCreator(id));
  };

  const onNeturalizeVoteThread = (id) => {
    dispatch(asyncNeutralizeVoteThreadActionCreator(id));
  };

  const onNavigateCreate = () => {
    navigate('/create');
  };

  return (
    <section className="min-h-screen w-full bg-[#F8F9FA]">
      <Navbar />
      <section className="flex flex-col justify-start items-start mx-auto max-w-5xl px-4 py-8 gap-5">
        <section className="flex flex-row justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Threads Terbaru</h1>
          <div className="flex flex-row justify-start items-center gap-4">
            <p className="font-semibold">Pilih kategori:</p>
            <select
              className="px-4 py-1 border rounded-md"
              defaultValue="semua"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="semua">Semua</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-[#2ECC71] text-white rounded-lg py-3 px-4 font-semibold cursor-pointer w-40 hover:bg-[#27AE60] transition-colors"
            type="button"
            onClick={onNavigateCreate}
          >
            <p className="flex flex-row justify-center items-center gap-2">
              <IoIosAddCircleOutline />
              {' '}
              Buat Thread
            </p>
          </button>
        </section>
        <ThreadLists
          threads={threadsList}
          upVote={onUpVoteThread}
          downVote={onDownVoteThread}
          neutralizeVote={onNeturalizeVoteThread}
        />
      </section>
    </section>
  );
}

export default HomePage;
