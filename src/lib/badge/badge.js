import React from 'react';

export default ({ children, type }) => (
  <span className={`badge ${type}`}>{children}</span>
);
