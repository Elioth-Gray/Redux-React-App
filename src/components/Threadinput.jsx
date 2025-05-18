import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/UseInput';

function Threadinput({ onCreate, authUser }) {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');
  const navigate = useNavigate();

  const onCreateClick = () => {
    if (authUser) {
      onCreate({ title, body, category });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-5">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Buat Thread</h1>
      </div>
      <div className="flex flex-col justify-start items-start rounded-md px-6 py-6 bg-white w-full border border-gray-200 shadow-sm gap-3">
        <form className="w-full flex flex-col justify-start items-start gap-3">
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <label htmlFor="title" className="font-bold text-lg w-full">
              Judul Thread
              <input
                name="title"
                id="title"
                className="border border-gray-400 rounded-lg px-4 py-2 w-full mt-2 font-normal"
                placeholder="Judul threadmu..."
                value={title}
                onChange={setTitle}
              />
            </label>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <label htmlFor="category" className="font-bold text-lg w-full">
              Kategori Thread
              <input
                name="category"
                id="category"
                className="border border-gray-400 rounded-lg px-4 py-2 w-full mt-2 font-normal"
                placeholder="Kategori threadmu..."
                value={category}
                onChange={setCategory}
              />
            </label>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <label htmlFor="body" className="font-bold text-lg w-full">
              Content Thread
              <textarea
                name="body"
                id="body"
                className="border border-gray-400 rounded-lg px-4 py-6 w-full mt-2 font-normal"
                placeholder="Tulis threadmu..."
                rows={9}
                value={body}
                onChange={setBody}
              />
            </label>
          </div>
          <div className="w-full flex flex-row justify-end items-center">
            <button
              className="bg-[#2ECC71] text-white rounded-lg py-3 px-4 font-semibold cursor-pointer min-w-46"
              type="button"
              onClick={onCreateClick}
            >
              Buat Thread
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Threadinput.propTypes = {
  onCreate: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

Threadinput.defaultProps = {
  authUser: null,
};

export default Threadinput;
