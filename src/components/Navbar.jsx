import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUserCreator } from '../states/auth/action';

function Navbar() {
  const { authUser } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateAuth = () => {
    navigate('/login');
  };

  const onLogout = () => {
    dispatch(asyncUnsetAuthUserCreator());
  };

  return (
    <nav className="w-full flex flex-row justify-between items-center py-8 px-52 border-b border-gray-500 bg-white">
      <h1 className="text-3xl font-bold text-[#3498DB]">Threads Otot</h1>
      <ul className="flex flex-row justify-center items-center gap-22 h-full">
        <li>
          <Link href="/" className="text-lg font-semibold">
            Home
          </Link>
        </li>
        <li>
          <Link href="/leaderboards" className="text-lg font-semibold">
            Leaderboards
          </Link>
        </li>
      </ul>
      {authUser ? (
        <div className="flex flex-row justify-center items-center text-black gap-5">
          <div className="flex flex-col justify-start items-start">
            <p className="font-bold">{authUser.name}</p>
            <p>{authUser.email}</p>
          </div>
          <button
            className="bg-red-400 text-white rounded-lg py-3 px-4 font-semibold cursor-pointer w-36"
            type="button"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-[#3498DB] text-white rounded-lg py-3 px-4 font-semibold cursor-pointer w-36"
          type="button"
          onClick={navigateAuth}
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
