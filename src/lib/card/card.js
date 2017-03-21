import React from 'react';

export default ({ closeButton, closeButtonOnClick, header, children, footer }) => (
  <div className='card'>
    {children}
    {
      closeButton
        && <div className='close-button'>
             <i
               className='fa fa-times'
               onClick={closeButtonOnClick || (() => this.setState({ closed: true }))}
             ></i>
           </div>
    }
  </div>
);
