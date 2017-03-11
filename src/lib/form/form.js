import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Form extends Component {
  constructor(props) {
    super();

    const { noValidate, model, ...formProps } = props;

    if(noValidate === false) {
      throw new Error('Form component must have noValidate equal to true.');
    }

    this.formProps = formProps;
    this.model = model;
    this.fields = [];
  }

  getChildContext() {
    return {
      model: this.model
    };
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    Emitter.on('new-input', data => this.fields = [...this.fields, ...data]);
    Emitter.on('data', () => this.toggleDisableButton());

    this.toggleDisableButton();
  }

  toggleDisableButton() {
    this.hasInvalidFields() ? Emitter.emit('disable-button') : Emitter.emit('enable-button');
  }

  hasInvalidFields() {
    return this.fields.filter(field => field.valid === false).length > 0;
  }

  render() {
    return (
      <div className='form'>
        <form
          noValidate
          ref={form => this.form = form}
          {...this.formProps}
        >
          <fieldset>
            {this.props.children}
          </fieldset>
        </form>
      </div>
    );
  }
}

Form.childContextTypes = {
  model: React.PropTypes.object
};
