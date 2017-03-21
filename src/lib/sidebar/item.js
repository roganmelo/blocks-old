import React from 'react';
import { Link } from 'react-router';

export default ({ active, icon, locale, path, label }) => (
  <li className={active ? 'active' : ''}>
    <Link to={locale ? `/${locale}${path}` : path}>
      <i className={icon}></i>
      {label}
    </Link>
  </li>
);
