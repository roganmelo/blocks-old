import React, { Component } from 'react';

export default class Body extends Component {
  constructor(props) {
    super();

    const { ...bodyProps } = props;

    this.bodyProps = bodyProps;
  }

  render() {
    return (
      <tbody {...this.bodyProps}>
        {this.props.children}
      </tbody>
    );
  }
}
