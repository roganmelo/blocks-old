import React, { Component } from 'react';

export default class Label extends Component {
  render() {
    const style = {
      backgroundColor: this.props.color,
      color: this.props.blackText ? 'black' : 'white'
    };

    return (
      <span
        style={style}
        className='label'
      >
        {this.props.children}
      </span>
    );
  }
}
