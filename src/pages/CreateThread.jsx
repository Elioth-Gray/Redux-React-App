import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Threadinput from '../components/Threadinput';
import Navbar from '../components/Navbar';
import { asyncCreateThreadActionCreator } from '../states/threads/action';

function CreateThread() {
  const navigate = useNavigate();
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate(-1);
  };

  const onCreateThread = async ({ title, body, category }) => {
    try {
      await dispatch(asyncCreateThreadActionCreator({ title, body, category }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#F8F9FA]">
      <Navbar />
      <section className="w-full mx-auto max-w-5xl px-4 mt-8 gap-3 flex flex-row justify-start items-center">
        <button
          className="text-lg cursor-pointer"
          onClick={handleGoBack}
          onKeyDown={(e) => e.key === 'Enter' && handleGoBack()}
          tabIndex="0"
          type="button"
        >
          <FaArrowLeft />
        </button>
        <button
          className="text-lg cursor-pointer"
          onClick={handleGoBack}
          onKeyDown={(e) => e.key === 'Enter' && handleGoBack()}
          tabIndex="0"
          type="button"
        >
          Kembali
        </button>
      </section>
      <section className="flex flex-col justify-start items-start mx-auto max-w-5xl px-4 py-8 gap-5">
        <Threadinput authUser={authUser} onCreate={onCreateThread} />
      </section>
    </section>
  );
}

export default CreateThread;
