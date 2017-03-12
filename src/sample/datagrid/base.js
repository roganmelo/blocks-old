import React, { Component } from 'react';

import { Datagrid, Header, Column, Body, Row, Cell, Footer, Pagination } from '../../lib/datagrid';

export default class DatagridWithToolbarSample extends Component {
  constructor() {
    super();

    this.list = [
      {
        id: '123123',
        name: 'João',
        lastName: 'da Silva'
      },
      {
        id: '321321',
        name: 'Maria',
        lastName: 'do Nascimento'
      },
      {
        id: '3452543',
        name: 'José',
        lastName: 'Costa'
      },
      {
        id: '1234324',
        name: 'Rosa',
        lastName: 'Araújo'
      },
      {
        id: '123123',
        name: 'Carlos',
        lastName: 'Fernandes'
      },
      {
        id: '321321',
        name: 'Fernanda',
        lastName: 'Facundo'
      }
    ];

    this.state = {
      total: 6,
      limit: 2,
      data: [
        {
          id: '123123',
          name: 'João',
          lastName: 'da Silva'
        },
        {
          id: '321321',
          name: 'Maria',
          lastName: 'do Nascimento'
        }
      ]
    };
  }

  changePage(page) {
    const begin = (page - 1) * this.state.limit;
    const end = ((page - 1) * this.state.limit) + this.state.limit;

    this.setState({ data: this.list.slice(begin, end) });
  }

  render() {
    return (
      <div style={{ padding: '50px 50px 0' }}>
        <h1>Datagrid</h1>

        <Datagrid
          data={this.state.data}
          placeholder='No records found.'
          updateDataCallback={data => this.setState({ data })}
        >
          <Header checkAll={true}>
            <Column
              sortable={true}
              dataProp='id'
            >
              Id
            </Column>
            <Column
              sortable={true}
              dataProp='name'
            >
              Name
            </Column>
            <Column
              sortable={true}
              dataProp='lastName'
            >
              Last Name
            </Column>
          </Header>
          <Body>
            {
              this.state.data.map(person =>
                <Row
                  key={person.id}
                  model={person}
                  selectable={true}
                  checkbox={true}
                >
                  <Cell>{person.id}</Cell>
                  <Cell>{person.name}</Cell>
                  <Cell>{person.lastName}</Cell>
                </Row>
              )
            }
          </Body>
          <Pagination
            total={this.state.total}
            limit={this.state.limit}
            colSpan={4}
            changePageCallback={this.changePage.bind(this)}
          />
          <Footer colSpan={4}>
            {this.state.data.length} people
          </Footer>
        </Datagrid>
        <pre>
          <code>
            {
              `
                <Datagrid
                  data={this.state.data}
                  placeholder='No records found.'
                  updateDataCallback={data => this.setState({ data })}
                >
                  <Header checkAll={true}>
                    <Column
                      sortable={true}
                      dataProp='id'
                    >
                      Id
                    </Column>
                    <Column
                      sortable={true}
                      dataProp='name'
                    >
                      Name
                    </Column>
                    <Column
                      sortable={true}
                      dataProp='lastName'
                    >
                      Last Name
                    </Column>
                  </Header>
                  <Body>
                    {
                      this.state.data.map(person =>
                        <Row
                          key={person.id}
                          model={person}
                          selectable={true}
                          checkbox={true}
                        >
                          <Cell>{person.id}</Cell>
                          <Cell>{person.name}</Cell>
                          <Cell>{person.lastName}</Cell>
                        </Row>
                      )
                    }
                  </Body>
                  <Pagination
                    total={this.state.total}
                    limit={this.state.limit}
                    colSpan={4}
                    changePageCallback={this.changePage.bind(this)}
                  />
                  <Footer colSpan={4}>
                    {this.state.data.length} people
                  </Footer>
                </Datagrid>
              `
            }
          </code>
        </pre>
      </div>
    );
  }
}
