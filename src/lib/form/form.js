import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Form extends Component {
  constructor(props) {
    super();

    const { noValidate, model, ...formProps } = props;

    if(noValidate === false) throw new Error('Form component must have noValidate equal to true.');

    this.formProps = formProps;
    this.model = model;
    this.fields = [];

    this.init();
  }

  getChildContext() {
    return {
      model: this.model
    };
  }

  componentDidMount() {
    this.fields = [...this.form].filter(field => (
      field.nodeName === 'INPUT' || field.nodeName === 'SELECT' || field.nodeName === 'TEXTAREA'
    ));
  }

  hasInvalidFields() {
    return this.fields.filter(field => field.valid === false).length;
  }

  init() {
    Emitter.on('data', () => {
      (this.hasInvalidFields() > 0)
        ? Emitter.emit('disable-button')
        : Emitter.emit('enable-button');
    });
  }

  render() {
    return (
      <form
        noValidate
        ref={form => this.form = form}
        {...this.formProps}
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
