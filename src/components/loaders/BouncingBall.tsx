import React from 'react';

//Own Components
import './BouncingBall.scss';

const BouncingBall = () => {
  return (
    <>
      <div className='loading-cover'></div>
      <div className='wrap'>
        <div>
          <div className='bounceball'></div>
          <div className='text'>NOW LOADING</div>
        </div>
      </div>
    </>
  );
};

export default BouncingBall;
