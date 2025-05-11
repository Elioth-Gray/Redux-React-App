import { useEffect } from 'react';
import { Route, Routes, Navigate, Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/preload/action';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ThreadPage from './pages/ThreadPage';
import CreateThread from './pages/CreateThread';
import LeaderboardsPage from './pages/LeaderboardsPage';
import Loading from './components/Loading';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) return null;

  return (
    <>
      <Loading></Loading>
      <main>
        <Routes>
          <Route
            path='/login'
            element={authUser ? <Navigate to='/' replace /> : <LoginPage />}
          />
          <Route
            path='/register'
            element={authUser ? <Navigate to='/' replace /> : <RegisterPage />}
          />

          <Route path='/' element={<HomePage />} />
          <Route
            path='/threads/:threadId'
            element={
              !authUser ? <Navigate to='/login' replace /> : <ThreadPage />
            }
          />

          <Route path='*' element={<Navigate to='/' replace />} />
          <Route
            path='/create'
            element={
              !authUser ? <Navigate to='/login' replace /> : <CreateThread />
            }
          ></Route>
          <Route
            path='/leaderboards'
            element={<LeaderboardsPage></LeaderboardsPage>}
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
