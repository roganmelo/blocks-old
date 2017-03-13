import React, { Component } from 'react';

import { Sidebar, Header, Profile, Form, Menu } from '../../lib/sidebar';

export default class SidebarSample extends Component {
  constructor() {
    super();

    this.user = {
      name: 'Luana Guimarães',
      img: 'http://i.pravatar.cc/150?img=5'
    }
  }

  logout() {
    alert('Logout');
  }

  render() {
    return (
      <div style={{ padding: '50px 50px 0 50px' }}>
        <h1>Sidebar</h1>

        <div style={{ position: 'relative', height: '300px', overflowX: 'hidden', overflowY: 'hidden', border: '1px solid #d1d1d1' }}>
          <Sidebar style={{ position: 'absolute' }}>
            <Header>
              <Profile
                userImg={this.user.img}
                username={this.user.name}
                logout={{
                  label: 'Exit',
                  callback: this.logout.bind(this)
                }}
              />
              <Form>
                <input type='text' placeholder='sidebar input' />
              </Form>
            </Header>
            <Menu items={[
              {
                icon: 'fa fa-minus',
                path: '/',
                label: 'Item 1'
              },
              {
                id: 'accordion',
                icon: 'fa fa-bars',
                label: 'Accordion',
                innerItems: [
                  {
                    path: '/sidebar',
                    label: 'Item 2'
                  },
                  {
                    path: '/sidebar2',
                    label: 'Item 3'
                  }
                ]
              }
            ]}/>
          </Sidebar>
        </div>
        <pre>
          <code>
            {
              `
                <Sidebar style={{ position: 'absolute' }}>
                  <Header>
                    <Profile
                      userImg={this.user.img}
                      username={this.user.name}
                      logout={{
                        label: 'Exit',
                        callback: this.logout.bind(this)
                      }}
                    />
                    <Form>
                      <select id='buildings'>
                        <option>Aquaville</option>
                        <option>Mandara</option>
                        <option>Golfville</option>
                      </select>
                    </Form>
                  </Header>
                  <Menu items={[
                    {
                      icon: 'fa fa-minus',
                      path: '/',
                      label: 'Item 1'
                    },
                    {
                      id: 'accordion',
                      icon: 'fa fa-bars',
                      label: 'Accordion',
                      innerItems: [
                        {
                          path: '/sidebar',
                          label: 'Item 2'
                        },
                        {
                          path: '/sidebar2',
                          label: 'Item 3'
                        }
                      ]
                    }
                  ]}/>
                </Sidebar>
              `
            }
          </code>
        </pre>
      </div>
    );
  }
}
