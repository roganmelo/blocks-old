import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Auxiliary extends Component {
  constructor(props) {
    super();

    this.state = { show: false };

    this.style = props.style;
    this.className = props.className;
  }

  componentDidMount() {
    Emitter.on('show-auxiliary', () => this.setState({ show: !this.state.show }));
  }

  render() {
    return (
      <div style={this.style} className={this.state.show ? `auxiliary active ${this.className}` : `auxiliary ${this.className}`}>
        <div className='auxiliary--content'>
          <div className='title'>{this.props.title}</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
