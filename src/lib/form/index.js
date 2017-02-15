import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Form extends Component {
  constructor() {
    super();

    this.fields = [];

    this.init();
  }

  getChildContext() {
    return {
      model: this.props.model
    };
  }

  componentDidMount() {
    this.fields = [...this.form].filter(field => ((
      field.nodeName === 'INPUT'
      && field.type !== 'checkbox'
      && field.type !== 'radio')
      || field.nodeName === 'SELECT'
      || field.nodeName === 'TEXTAREA'
    ));
  }

  hasInvalidField() {
    return this.fields.filter(field => field.valid === false).length;
  }

  init() {
    PubSub.subscribe('data', () => {
      this.hasInvalidField()
        ? PubSub.publish('disable-button')
        : PubSub.publish('enable-button');
    });
  }

  render() {
    return (
      <form
        noValidate
        ref={form => this.form = form}
      >
        <fieldset>
          {this.props.children}
        </fieldset>
      </form>
    );
  }
}

Form.childContextTypes = {
  model: React.PropTypes.object
};
