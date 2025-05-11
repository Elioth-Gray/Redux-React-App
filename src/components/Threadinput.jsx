import React from 'react';
import useInput from '../hooks/UseInput';
import PropTypes from 'prop-types';

const Threadinput = ({ onCreate, authUser }) => {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');

  const onCreateClick = () => {
    if (authUser) {
      onCreate({ title, body, category });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='w-full flex flex-col justify-start items-start gap-5'>
      <div className='flex flex-row justify-between items-center w-full'>
        <h1 className='text-2xl font-bold'>Buat Thread</h1>
      </div>
      <div className='flex flex-col justify-start items-start rounded-md px-6 py-6 bg-white w-full border border-gray-200 shadow-sm gap-3'>
        <form
          action=''
          className='w-full flex flex-col justify-start items-start gap-3'
        >
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <label htmlFor='' className='font-bold text-lg'>
              Judul Thread
            </label>
            <input
              name=''
              id=''
              className='border border-gray-400 rounded-lg px-4 py-2 w-full'
              placeholder='Judul threadmu...'
              value={title}
              onChange={setTitle}
            ></input>
          </div>
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <label htmlFor='' className='font-bold text-lg'>
              Kategori Thread
            </label>
            <input
              name=''
              id=''
              className='border border-gray-400 rounded-lg px-4 py-2 w-full'
              placeholder='Kategori threadmu...'
              value={category}
              onChange={setCategory}
            ></input>
          </div>
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <label htmlFor='' className='font-bold text-lg'>
              Content Thread
            </label>
            <textarea
              name=''
              id=''
              className='border border-gray-400 rounded-lg px-4 py-6 w-full'
              placeholder='Tulis Komentarmu...'
              rows={9}
              value={body}
              onChange={setBody}
            ></textarea>
          </div>
          <div className='w-full flex flex-row justify-end items-center'>
            <button
              className='bg-[#2ECC71] text-white rounded-lg py-3 px-4 font-semibold cursor-pointer min-w-46'
              type='button'
              onClick={onCreateClick}
            >
              Buat Thread
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Adding prop types
Threadinput.propTypes = {
  onCreate: PropTypes.func.isRequired,  
  authUser: PropTypes.object,           
};

export default Threadinput;
