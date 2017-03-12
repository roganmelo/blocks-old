import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './app';
import Home from './home';
import AlertSample from './alert';
import DatagridSample from './datagrid';
import FormSample from './form';
import LoaderSample from './loader';
import BadgeSample from './badge';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='alert' component={AlertSample}/>
      <Route path='badge' component={BadgeSample}/>
      <Route path='datagrid' component={DatagridSample}/>
      <Route path='form' component={FormSample}/>
      <Route path='/loader/:show' component={LoaderSample}/>
    </Route>
  </Router>
), document.getElementById('root'));
