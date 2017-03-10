import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Filters extends Component {
  constructor() {
    super();

    this.state = { show: false };
  }

  componentDidMount() {
    Emitter.on('show-filters', () => this.setState({ show: !this.state.show }));
  }

  render() {
    return (
      <div className={this.state.show ? 'filters active' : 'filters'}>
        <div className='filters--content'>
          <div className='title'>Filters</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
