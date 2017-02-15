import React, { Component } from 'react';

import PubSub from 'pubsub-js';

export default class Button extends Component {
  constructor(props) {
    super();

    const { type } = props;

    if(type && type !== 'button')
      throw new Error('Button can works only with type button.');

    this.state = {
      invalid: true,
      errors: []
    };

    this.init();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  init() {
    PubSub.subscribe('clear-error', (topic, error) => {
      let errors = [...this.state.errors];

      if(errors.indexOf(error) > -1)
        errors.splice(errors.indexOf(error), 1);

      this.setState({
        invalid: false,
        errors
      });
    });

    PubSub.subscribe('set-error', (topic, error) => {
      this.setState({ errors: [...this.state.errors, error] });
    });
  }

  render() {
    return (
      <div>
        <button
          type='button'
          disabled={this.state.invalid || this.state.errors.length}
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
