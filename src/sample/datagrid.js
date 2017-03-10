import React, { Component } from 'react';
import { Link } from 'react-router';

import { Toolbar, Filters } from '../lib/toolbar';
import { Datagrid, Head, Column, Body, Row, Cell, Footer, Pagination } from '../lib/datagrid';

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
          lastName: {
            foo: 'da Silva'
          }
        },
        {
          id: '321321',
          name: 'Maria',
          lastName: {
            foo: 'do Nascimento'
          }
        }
      ]
    };
  }

  delete() {
    this.setState({ data: this.state.data.filter(person => !person.checked) });
  }

  changePage(page) {
    const begin = (page - 1) * this.state.limit;
    const end = (page - 1) * this.state.limit + this.state.limit;

    this.setState({ data: this.list.slice(begin, end) });
  }

  render() {
    return (
      <div>
        <Toolbar
          title='Datagrid/Toolbar'
          searchInput={{
            placeholder: 'Search'
          }}
          deleteButton={{
            icon: 'fa fa-trash-o',
            label: 'Delete',
            callback: this.delete.bind(this)
          }}
          filterButtonLabel='Filters'
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
        <Filters>
          <label>Bar</label>
          <input type='text'/>
          <label>
            <input type='checkbox'/>
            Foobar
          </label>
        </Filters>
        <Datagrid
          data={this.state.data}
          placeholder='No records found.'
          updateDataCallback={updatedData => this.setState({ data: updatedData })}
        >
          <Head selectAllCheckbox={true}>
            <Column
              detachable={true}
              dataProp='id'
            >
              Id
            </Column>
            <Column
              detachable={true}
              dataProp='name'
            >
              Name
            </Column>
            <Column
              detachable={true}
              dataProp='lastName.foo'
            >
              Last Name
            </Column>
          </Head>
          <Body>
            {
              this.state.data.map(person =>
                <Row
                  key={person.id}
                  model={person}
                  selectable={true}
                  hasCheckbox={true}
                >
                  <Cell>{person.id}</Cell>
                  <Cell>{person.name}</Cell>
                  <Cell>{person.lastName.foo}</Cell>
                </Row>
              )
            }
          </Body>
          <Pagination
            total={50}
            limit={15}
            colSpan={4}
            resume='1 - 10 of 103 people'
            changePageCallback={this.changePage.bind(this)}
          />
          <Footer colSpan={4}>
            {this.state.data.length} people
          </Footer>
        </Datagrid>
      </div>
    );
  }
}
