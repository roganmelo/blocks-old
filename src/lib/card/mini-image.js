import React from 'react';

export default ({ src, alt, children }) => (
  <div className='mini-img'>
    <img
      src={src}
      alt={alt}
    />
    <div className='description'>
      {children}
    </div>
  </div>
);
