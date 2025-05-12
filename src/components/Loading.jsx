import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="sticky top-0">
      <LoadingBar showFastActions />
    </div>
  );
}

export default Loading;
