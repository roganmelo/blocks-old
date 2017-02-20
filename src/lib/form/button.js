import React, { Component } from 'react';
import PubSub from 'pubsub-js';

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
    PubSub.subscribe('disable-button', () => this.setState({ invalid: true }));
    PubSub.subscribe('enable-button', () => this.setState({ invalid: false }));
  }

  render() {
    return (
      <div>
        <button
          type='button'
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
