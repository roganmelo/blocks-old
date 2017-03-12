import React from 'react';

export default ({ style, className, children }) => (
  <aside style={style} className={`sidebar ${className || ''}`}>
    {children}
  </aside>
);
