import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './app';
import Home from './home';
import DatagridSample from './datagrid';
import FormSample from './form';
import LoaderSample from './loader';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/loader/:show' component={LoaderSample}/>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='datagrid' component={DatagridSample}/>
      <Route path='form' component={FormSample}/>
    </Route>
  </Router>
), document.getElementById('root'));
