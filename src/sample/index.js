import React from 'react';
import ReactDOM from 'react-dom';

import { Datagrid, Head, Column, Body, Row, Cell, Footer, Sidebar } from '../lib';

ReactDOM.render((
  <div>
    <h1>App works!</h1>
    <Sidebar></Sidebar>
    <Datagrid>
      <Head>
        <Column>Company</Column>
        <Column>Admin</Column>
        <Column>Projects</Column>
      </Head>

      <Body>
        <Row>
          <Cell>Hook</Cell>
          <Cell>Self</Cell>
          <Cell>5</Cell>
        </Row>
        <Row>
          <Cell>Severino</Cell>
          <Cell>Self</Cell>
          <Cell>5</Cell>
        </Row>
      </Body>

      <Footer>
        Total: $180000
      </Footer>
    </Datagrid>
  </div>
), document.getElementById('root'));
