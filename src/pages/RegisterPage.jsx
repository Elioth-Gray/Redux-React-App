import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUserCreator } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUserCreator({ name, email, password }));
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center h-screen bg-[#F8F9FA]">
      <div className="flex flex-col justify-start items-start gap-5">
        <div className="text-3xl font-bold text-[#3498DB]">Threads Otot</div>
        <div>
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-gray-700 mt-1">
            Buat akun baru untuk bergabung dengan forum
          </p>
        </div>
        <div className="rounded-lg px-6 py-6 bg-white border border-gray-300">
          <RegisterInput register={onSubmit} />
        </div>
        <p className="mt-4 text-sm w-full text-center">
          Sudah memiliki akun?
          {' '}
          <a href="/login" className="text-[#3498DB]">
            Masuk sekarang
          </a>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
