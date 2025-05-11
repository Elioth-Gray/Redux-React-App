import React from 'react';
import Navbar from '../components/Navbar';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Threadinput from '../components/Threadinput';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateThreadActionCreator } from '../states/threads/action';

const CreateThread = () => {
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
    <section className='min-h-screen w-full bg-[#F8F9FA]'>
      <Navbar />
      <section className='w-full mx-auto max-w-5xl px-4 mt-8 gap-3 flex flex-row justify-start items-center'>
        <FaArrowLeft
          className='text-lg  cursor-pointer'
          onClick={handleGoBack}
        ></FaArrowLeft>
        <p className='text-lg cursor-pointer' onClick={handleGoBack}>
          Kembali
        </p>
      </section>
      <section className='flex flex-col justify-start items-start mx-auto max-w-5xl px-4 py-8 gap-5'>
        <Threadinput
          authUser={authUser}
          onCreate={onCreateThread}
        ></Threadinput>
      </section>
    </section>
  );
};

export default CreateThread;
