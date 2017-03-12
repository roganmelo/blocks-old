import React from 'react';

export default ({ title, children }) => (
  <div className='card--content'>
    <div className='title'>{title}</div>
    {children}
  </div>
);
