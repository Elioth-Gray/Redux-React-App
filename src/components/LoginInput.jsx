import React from 'react';
import useInput from '../hooks/UseInput';
import PropTypes from 'prop-types';

const LoginInput = ({ login }) => {
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  return (
    <form
      action=''
      className='w-fit flex flex-col justify-start items-start gap-5'
    >
      <div className='flex flex-col justify-start items-start gap-3'>
        <label htmlFor='email' className='font-semibold text-[1rem]'>
          Email
        </label>
        <input
          type='text'
          className='border border-gray-400 rounded-md py-2 px-4 w-80'
          placeholder='email@example.com'
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div className='flex flex-col justify-start items-start gap-2'>
        <label htmlFor='email' className='font-semibold text-[1rem]'>
          Password
        </label>
        <input
          type='password'
          className='border border-gray-400 rounded-md py-2 px-4 w-80'
          placeholder='***********'
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <div className='w-80'>
        <button
          className='w-full bg-[#3498DB] text-white rounded-lg py-3 px-4 font-semibold cursor-pointer'
          type='button'
          onClick={() => {
            login({ email, password });
          }}
        >
          Masuk
        </button>
      </div>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
