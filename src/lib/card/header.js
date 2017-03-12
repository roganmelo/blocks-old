import React from 'react';

export default ({ image, children }) => (
  <div className='card--header'>
    {
      image
        ? <img
            src={image.src}
            alt={image.alt}
            />
          : <div className='text'>{children}</div>
    }
  </div>
);
