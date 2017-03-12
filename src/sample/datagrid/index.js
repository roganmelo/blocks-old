import React, { Component } from 'react';
import { Link } from 'react-router';

import { Toolbar, Auxiliary } from '../../lib/toolbar';
import { Datagrid, Header, Column, Body, Row, Cell, Footer, Pagination } from '../../lib/datagrid';

export default class DatagridSample extends Component {
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

  delete() {
    this.setState({ data: this.state.data.filter(person => !person.checked) });
  }

  changePage(page) {
    const begin = (page - 1) * this.state.limit;
    const end = ((page - 1) * this.state.limit) + this.state.limit;

    this.setState({ data: this.list.slice(begin, end) });
  }

  render() {
    return (
      <div>
        <Toolbar
          title='Datagrid/Toolbar'
          searchInputPlaceholder='Search'
          auxiliaryButton={{
            icon: 'fa fa-filter',
            label: 'Filters'
          }}
        >
          <Link to='/form'>
            <i className='fa fa-plus'></i>
            New
          </Link>
          <div
            className='danger'
            onClick={this.delete.bind(this)}
          >
            <i className='fa fa-trash-o'></i>
            Delete
          </div>
        </Toolbar>
        <Auxiliary title='Filters'>
          <label>Bar</label>
          <input type='text'/>
          <label>
            <input type='checkbox'/>
            Foobar
          </label>
        </Auxiliary>
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
        <div style={{ padding: '0 50px' }}>
          <pre>
            <code>
              {
                `
                  <Toolbar
                    title='Datagrid/Toolbar'
                    searchInputPlaceholder='Search'
                    auxiliaryButton={{
                      icon: 'fa fa-filter',
                      label: 'Filters'
                    }}
                  >
                    <Link to='/form'>
                      <i className='fa fa-plus'></i>
                      New
                    </Link>
                    <div
                      className='danger'
                      onClick={this.delete.bind(this)}
                    >
                      <i className='fa fa-trash-o'></i>
                      Delete
                    </div>
                  </Toolbar>
                  <Auxiliary title='Filters'>
                    <label>Bar</label>
                    <input type='text'/>
                    <label>
                      <input type='checkbox'/>
                      Foobar
                    </label>
                  </Auxiliary>
                  <div className='list-content'>
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
                  </div>
                `
              }
            </code>
          </pre>
        </div>
      </div>
    );
  }
}
