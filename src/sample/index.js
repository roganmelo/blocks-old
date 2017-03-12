import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './app';
import Home from './home';
import AlertSample from './alert';
import BadgeSample from './badge';
import CardSample from './card';
import DatagridSample from './datagrid/base';
import DatagridWithToolbarSample from './datagrid/with-toolbar';
import FormSample from './form';
import GridSample from './grid';
import LabelSample from './label';
import LoaderSample from './loader';
import SidebarSample from './sidebar';
import ToolbarSample from './toolbar';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='alert' component={AlertSample}/>
      <Route path='card' component={CardSample}/>
      <Route path='badge' component={BadgeSample}/>
      <Route path='datagrid' component={DatagridSample}/>
      <Route path='datagrid/toolbar' component={DatagridWithToolbarSample}/>
      <Route path='form' component={FormSample}/>
      <Route path='grid' component={GridSample}/>
      <Route path='label' component={LabelSample}/>
      <Route path='loader/:show' component={LoaderSample}/>
      <Route path='sidebar' component={SidebarSample}/>
      <Route path='toolbar' component={ToolbarSample}/>
    </Route>
  </Router>
), document.getElementById('root'));
