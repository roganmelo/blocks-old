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
                <option>Aquaville</option>
                <option>Mandara</option>
                <option>Golfville</option>
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
