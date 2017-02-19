import React, { Component } from 'react';

import { Datagrid, Head, Column, Body, Row, Cell, Footer } from '../lib/datagrid';

export default class DatagridSample extends Component {
  render() {
    return (
      <div>
        <h1>Datagrid</h1>
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
    );
  }
}
