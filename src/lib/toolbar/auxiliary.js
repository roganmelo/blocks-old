import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Auxiliary extends Component {
  constructor() {
    super();

    this.state = { show: false };
  }

  componentDidMount() {
    Emitter.on('show-auxiliary', () => this.setState({ show: !this.state.show }));
  }

  render() {
    return (
      <div className={this.state.show ? 'auxiliary active' : 'auxiliary'}>
        <div className='auxiliary--content'>
          <div className='title'>{this.props.title}</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}