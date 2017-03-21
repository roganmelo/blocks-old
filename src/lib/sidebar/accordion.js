import React from 'react';
import { Link } from 'react-router';

export default ({ id, icon, label, locale, items, selectedItem }) => (
  <li className={items.some(item => item.path === selectedItem) ? 'accordion active' : 'accordion'}>
    <label htmlFor={id}>
      <i className={icon}></i>
      {label}
      <span className='arrow-down'>▾</span>
    </label>
    <input id={id} type='checkbox'/>
    <ul>
      {
        items.map(item =>
          <li key={item.path} className={item.path === selectedItem ? 'active' : ''}>
            <Link to={locale ? `/${locale}${item.path}` : item.path}>{item.label}</Link>
          </li>
        )
      }
    </ul>
  </li>
);
