import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncSetAuthUserCreator } from '../states/auth/action';
import LoginInput from '../components/LoginInput';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async ({ email, password }) => {
    try {
      await dispatch(asyncSetAuthUserCreator({ email, password }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center h-screen bg-[#F8F9FA]">
      <div className="flex flex-col justify-start items-start gap-5">
        <div className="text-3xl font-bold text-[#3498DB]">Threads Otot</div>
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-gray-700 mt-1">
            Masuk ke akun Anda untuk berdiskusi di forum
          </p>
        </div>
        <div className="rounded-lg px-6 py-6 bg-white border border-gray-300">
          <LoginInput login={onLogin} />
        </div>
        <p className="mt-4 text-sm w-full text-center">
          Belum punya akun?
          {' '}
          <Link href="/register" className="text-[#3498DB]">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
