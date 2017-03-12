import React, { Component } from 'react';

import SidebarItems from './sidebar-items';
import { Sidebar, Header, Profile, Form, Menu } from '../lib/sidebar';

export default class App extends Component {
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
      <main>
        <Sidebar>
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
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </Form>
          </Header>
          <Menu items={SidebarItems}/>
        </Sidebar>
        <div>
          {this.props.children}
        </div>
      </main>
    );
  }
}
