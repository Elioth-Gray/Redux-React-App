import PropTypes from 'prop-types';
import useInput from '../hooks/UseInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-fit flex flex-col justify-start items-start gap-5"
    >
      <div className="flex flex-col justify-start items-start gap-3">
        <label htmlFor="email" className="font-semibold text-[1rem]">
          Email
          <input
            id="email"
            name="email"
            type="email"
            className="border border-gray-400 rounded-md py-2 px-4 w-80 mt-3 block"
            placeholder="email@example.com"
            value={email}
            onChange={onEmailChange}
            required
          />
        </label>
      </div>
      <div className="flex flex-col justify-start items-start gap-2">
        <label htmlFor="password" className="font-semibold text-[1rem]">
          Password
          <input
            id="password"
            name="password"
            type="password"
            className="border border-gray-400 rounded-md py-2 px-4 w-80 mt-2 block"
            placeholder="***********"
            value={password}
            onChange={onPasswordChange}
            required
          />
        </label>
      </div>
      <div className="w-80">
        <button
          className="w-full bg-[#3498DB] text-white rounded-lg py-3 px-4 font-semibold cursor-pointer"
          type="submit"
        >
          Masuk
        </button>
      </div>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
