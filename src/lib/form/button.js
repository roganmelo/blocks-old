import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Button extends Component {
  constructor(props) {
    super();

    const { type, disabled, disableOnInvalid, ...buttonProps } = props;

    if(type && type !== 'button')
      throw new Error('Button component works only with type button.');

    this.state = {
      disabled: disabled || true
    };

    this.disableOnInvalid = disableOnInvalid;
    this.buttonProps = buttonProps;

    this.init();
  }

  componentWillReceiveProps(nextProps) {
    this.update();
  }

  init() {
    Emitter.on('disable-button', () => this.setState({ disabled: true }));
    Emitter.on('enable-button', () => this.setState({ disabled: false }));
  }

  update(props) {
    this.setState(props);
  }

  render() {
    return (
      <div>
        <button
          type='button'
          disabled={this.disableOnInvalid && this.state.disabled}
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
