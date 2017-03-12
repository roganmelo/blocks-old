import React, { Component } from 'react';

export default class Alert extends Component {
  constructor() {
    super();

    this.state = { closed: false };
  }

  render() {
    if(this.state.closed) {
      return false;
    }

    return (
      <div className={`alert ${this.props.type || 'info'}`}>
        <span className='alert-header'>
          <i className='icon'></i>
          {this.props.title}
          {
            this.props.closeButton
              && <i
                   className='fa fa-times'
                   onClick={() => this.setState({ closed: true })}
                 ></i>
          }
        </span>
        <span className='alert-text'>
          {this.props.children}
        </span>
      </div>
    );
  }
}
