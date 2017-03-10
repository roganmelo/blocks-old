import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Loader extends Component {
  constructor(props) {
    super();

    this.state = {
      text: props.text || 'LOADING',
      actived: false
    };
  }

  componentDidMount() {
    Emitter.on('loader:show', (text = this.state.text) => this.setState({ actived: true, text }));
    Emitter.on('loader:hide', () => this.setState({ actived: false }));
  }

  static show(text) {
    Emitter.emit('loader:show', text);
  }

  static hide() {
    Emitter.emit('loader:hide');
  }

  render(){
    return (
      <div className={this.state.actived ? 'spinner-wrapper spinner-wrapper-actived' : 'spinner-wrapper'}>
        <div className='spinner-overlay'></div>
        <div className='spinner'>
          <div className='spinner--ball'></div>
          <p>{this.state.text}</p>
        </div>
      </div>
    );
  }
}
