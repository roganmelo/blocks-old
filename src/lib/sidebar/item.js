import React from 'react';
import { Link } from 'react-router';

export default ({ active, icon, path, label }) => (
  <li className={active ? 'active' : ''}>
    <Link to={path}>
      <i className={icon}></i>
      {label}
    </Link>
  </li>
);
