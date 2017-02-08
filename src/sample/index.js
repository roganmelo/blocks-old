import React from 'react';
import ReactDOM from 'react-dom';

import { Datagrid, Sidebar } from '../lib';

ReactDOM.render((
  <div>
    <h1>App works!</h1>
    <Datagrid></Datagrid>
    <Sidebar></Sidebar>
  </div>
), document.getElementById('root'));
