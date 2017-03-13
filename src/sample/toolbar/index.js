import React, { Component } from 'react';

import { Toolbar, Auxiliary } from '../../lib/toolbar';

export default class ToolbarSample extends Component {
  render() {
    return (
      <div style={{ padding: '50px 50px 0 50px' }}>
        <h1>Toolbar</h1>

        <div style={{ position: 'relative', height: '300px', overflowX: 'hidden', overflowY: 'hidden', border: '1px solid #d1d1d1' }}>
          <Toolbar
            style={{
              position: 'absolute',
              left: '0'
            }}
            title='Toolbar'
            searchInputPlaceholder='Search'
            auxiliaryButton={{
              icon: 'fa fa-filter',
              label: 'Filters'
            }}
          >
            <div
              onClick={() => alert('New button was clicked!')}
            >
              <i className='fa fa-plus'></i>
              New
            </div>
            <div
              className='danger'
              onClick={() => alert('Delete button was clicked!')}
            >
              <i className='fa fa-trash-o'></i>
              Delete
            </div>
          </Toolbar>
          <Auxiliary
            style={{
              position: 'absolute'
            }}
            title='Filters'
          >
            <label>Bar</label>
            <input type='text'/>
            <label>
              <input type='checkbox'/>
              Foobar
            </label>
          </Auxiliary>
        </div>
        <pre>
          <code>
            {
              `
                <Toolbar
                  style={{
                    position: 'absolute',
                    left: '0'
                  }}
                  title='Toolbar'
                  searchInputPlaceholder='Search'
                  auxiliaryButton={{
                    icon: 'fa fa-filter',
                    label: 'Filters'
                  }}
                >
                  <div>
                    <i className='fa fa-plus'></i>
                    New
                  </div>
                  <div
                    className='danger'
                  >
                    <i className='fa fa-trash-o'></i>
                    Delete
                  </div>
                </Toolbar>
                <Auxiliary
                  style={{
                    position: 'absolute'
                  }}
                  title='Filters'
                >
                  <label>Bar</label>
                  <input type='text'/>
                  <label>
                    <input type='checkbox'/>
                    Foobar
                  </label>
                </Auxiliary>
              `
            }
          </code>
        </pre>
      </div>
    );
  }
}
