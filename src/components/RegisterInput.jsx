import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/UseInput';

const RegisterInput = ({ register }) => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className='w-fit flex flex-col justify-start items-start gap-5'>
      <div className='flex flex-col justify-start items-start gap-3'>
        <label htmlFor='email' className='font-semibold text-[1rem]'>
          Nama
        </label>
        <input
          type='text'
          className='border border-gray-400 rounded-md py-2 px-4 w-80'
          placeholder='Nama Lengkap'
          value={name}
          onChange={onNameChange}
        />
      </div>
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
          className='w-full bg-[#2ECC71] text-white rounded-lg py-3 px-4 font-semibold cursor-pointer'
          onClick={() => register({ name, email, password })}
          type='button'
        >
          Daftar
        </button>
      </div>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
