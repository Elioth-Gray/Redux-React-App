import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CommentInput from '../components/CommentInput';
import ThreadDetail from '../components/ThreadDetail';
import Navbar from '../components/Navbar';
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

function ThreadPage() {
  const { threadDetail, authUser } = useSelector((states) => states);
  const { threadId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetailActionController(threadId));
  }, [dispatch, threadId]);

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
    <section className="min-h-screen w-full bg-[#F8F9FA]">
      <Navbar />
      <section className="w-full mx-auto max-w-5xl px-4 mt-8 gap-3 flex flex-row justify-start items-center">
        <FaArrowLeft
          className="text-lg  cursor-pointer"
          onClick={handleGoBack}
        />
        <span
          role="button"
          tabIndex={0}
          onClick={handleGoBack}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleGoBack();
          }}
          className="text-lg cursor-pointer"
        >
          Kembali
        </span>
      </section>
      <section className="flex flex-col justify-start items-start mx-auto max-w-5xl px-4 py-8 gap-5">
        <section className="flex flex-row justify-between items-center w-full">
          <h1 className="text-2xl font-bold">Detail Thread</h1>
        </section>
        <ThreadDetail
          id={threadDetail?.id}
          title={threadDetail?.title}
          body={threadDetail?.body}
          category={threadDetail?.category}
          createdAt={threadDetail?.createdAt}
          upVotesBy={threadDetail?.upVotesBy}
          downVotesBy={threadDetail?.downVotesBy}
          totalComments={threadDetail?.totalComments}
          owner={threadDetail?.owner}
          authUser={authUser?.id}
          upVote={onUpVoteThread}
          downVote={onDownVoteThread}
          neutralizeVote={onNeturalizeVoteThread}
        />
      </section>
      <section className="flex flex-col justify-start items-start mx-auto max-w-5xl px-4 py-8 gap-5">
        <CommentInput
          length={threadDetail?.comments?.length}
          onCreate={onCreateComment}
          authUser={authUser?.id}
          id={threadId}
        />
        <CommentLists
          comments={threadDetail?.comments}
          authUser={authUser.id}
          upVote={onUpVoteComment}
          downVote={onDownVoteComment}
          neutralizeVote={onNeturalizeVoteComment}
        />
      </section>
    </section>
  );
}

export default ThreadPage;
