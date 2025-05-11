import React from 'react';
import useInput from '../hooks/UseInput';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CommentInput = ({ length, onCreate, id, authUser }) => {
  const [content, setContent] = useInput('');
  const navigate = useNavigate();

  const onCreateClick = () => {
    if (authUser) {
      onCreate(content, id);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='w-full flex flex-col justify-start items-start gap-5'>
      <div className='flex flex-row justify-between items-center w-full'>
        <h1 className='text-2xl font-bold'>Komentar ({length})</h1>
      </div>
      <div className='flex flex-col justify-start items-start rounded-md px-6 py-6 bg-white w-full border border-gray-200 shadow-sm gap-3'>
        <form
          action=''
          className='w-full flex flex-col justify-start items-start gap-3'
        >
          <div className='w-full flex flex-row justify-start items-start gap-6'>
            <div className='size-10 rounded-full bg-gray-400 flex flex-col justify-center items-center text-white font-bold'>
              A
            </div>
            <textarea
              name=''
              id=''
              className='border border-gray-400 rounded-lg px-4 py-6 grow'
              placeholder='Tulis Komentarmu...'
              value={content}
              onChange={setContent}
            ></textarea>
          </div>
          <div className='w-full flex flex-row justify-end items-center'>
            <button
              className='bg-[#3498DB] text-white rounded-lg py-3 px-4 font-semibold cursor-pointer min-w-46'
              onClick={onCreateClick}
              type='button'
            >
              Kirim Komentar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CommentInput.propTypes = {
  length: PropTypes.number,
  onCreate: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  authUser: PropTypes.string,
};

export default CommentInput;
