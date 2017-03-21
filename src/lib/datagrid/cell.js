import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props, context) {
    super();

    const { children, ...tdProps } = props;

    this.children = children;
    this.tdProps = tdProps;
    this.selectableCallback = context.selectableCallback;
  }

  render() {
    return (
      <td
        onClick={this.selectableCallback}
        {...this.tdProps}
      >
        {this.children}
      </td>
    );
  }
}

Cell.contextTypes = { selectableCallback: React.PropTypes.func };
