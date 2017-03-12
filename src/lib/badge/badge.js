import React, { Component } from 'react';

export default class Badge extends Component {
  render() {
    const style = {
      backgroundColor: this.props.color,
      color: this.props.blackText ? 'black' : 'white'
    };

    return (
      <span
        style={style}
        className='badge'
      >
        {this.props.children}
      </span>
    );
  }
}
