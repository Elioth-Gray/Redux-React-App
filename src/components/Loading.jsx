import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

const Loading = () => {
  return (
    <div className='sticky top-0'>
      <LoadingBar showFastActions={true} />
    </div>
  );
};

export default Loading;
