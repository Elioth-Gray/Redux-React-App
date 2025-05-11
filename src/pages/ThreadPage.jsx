// ThreadPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import ThreadDetail from '../components/ThreadDetail';
import { FaArrowLeft } from 'react-icons/fa';
import CommentInput from '../components/CommentInput';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncCreateCommentActionCreator,
  asyncDownVoteThreadDetailActionCreator,
  asyncNeutralizeVoteThreadDetailActionCreator,
  asyncReceiveThreadDetailActionController,
  asyncToggleDownVoteCommentActionCreator,
  asyncToggleNeutralizeUpVoteCommentActionCreator,
  asyncToggleUpVoteCommentActionCreator,
  asyncUpVoteThreadDetailActionCreator,
} from '../states/threadDetail/action';
import CommentLists from '../components/CommentLists';

const ThreadPage = () => {
  const { threadDetail, authUser } = useSelector((states) => states);
  const { threadId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetailActionController(threadId));
  }, [dispatch]);

  useEffect(() => {
    if (threadDetail) {
      console.log(threadDetail);
    }
  }, [threadDetail]);

  const onUpVoteThread = (id) => {
    dispatch(asyncUpVoteThreadDetailActionCreator(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncDownVoteThreadDetailActionCreator(id));
  };

  const onNeturalizeVoteThread = (id) => {
    dispatch(asyncNeutralizeVoteThreadDetailActionCreator(id));
  };

  const onUpVoteComment = (id) => {
    dispatch(asyncToggleUpVoteCommentActionCreator(id));
  };

  const onDownVoteComment = (id) => {
    dispatch(asyncToggleDownVoteCommentActionCreator(id));
  };

  const onNeturalizeVoteComment = (id) => {
    dispatch(asyncToggleNeutralizeUpVoteCommentActionCreator(id));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const onCreateComment = (content, id) => {
    dispatch(asyncCreateCommentActionCreator({ content, id }));
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
        <section className='flex flex-row justify-between items-center w-full'>
          <h1 className='text-2xl font-bold'>Detail Thread</h1>
        </section>
        <ThreadDetail
          {...threadDetail}
          authUser={authUser.id}
          upVote={onUpVoteThread}
          downVote={onDownVoteThread}
          neutralizeVote={onNeturalizeVoteThread}
        />
      </section>
      <section className='flex flex-col justify-start items-start mx-auto max-w-5xl px-4 py-8 gap-5'>
        <CommentInput
          length={threadDetail?.comments?.length}
          onCreate={onCreateComment}
          authUser={authUser?.id}
          id={threadId}
        ></CommentInput>
        <CommentLists
          comments={threadDetail?.comments}
          authUser={authUser.id}
          upVote={onUpVoteComment}
          downVote={onDownVoteComment}
          neutralizeVote={onNeturalizeVoteComment}
        ></CommentLists>
      </section>
    </section>
  );
};

export default ThreadPage;
