import React from 'react';

export default ({ userImg, username, logout }) => (
  <div className='profile'>
    <div className='avatar'>
      <img src={userImg} alt='avatar'/>
    </div>
    <div className='info'>
      <div className='name'>{username}</div>
      <div className='logout' onClick={logout.callback}>
        <i className='fa fa-power-off'></i>
        {logout.label}
      </div>
    </div>
  </div>
);
