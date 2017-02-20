import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Button extends Component {
  constructor(props) {
    super();

    const { type, disableOnInvalid, ...buttonProps } = props;

    if(type && type !== 'button')
      throw new Error('Button component works only with type button.');

    this.state = { invalid: true };

    this.disableOnInvalid = disableOnInvalid;
    this.buttonProps = buttonProps;

    this.init();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  init() {
    Emitter.on('disable-button', () => this.setState({ invalid: true }));
    Emitter.on('enable-button', () => this.setState({ invalid: false }));
  }

  render() {
    return (
      <div>
        <button
          type='button'
          disabled={this.disableOnInvalid && this.state.invalid}
          {...this.buttonProps}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

Button.contextTypes = {
  model: React.PropTypes.object
};
