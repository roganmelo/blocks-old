import React, { Component } from 'react';
import Validator from 'validator';
import PubSub from 'pubsub-js';

import './styles.scss';
import SetByDot from '../utils/set-by-dot';

export default class Input extends Component {
  constructor(props, context) {
    super();

    if(props.type === 'checkbox' || props.type === 'radio')
      throw new Error('Input doesnt works with types checkbox or radio.');

    const { type, value, label, modelProp, validateOn, validators, ...inputProps } = props;

    this.state = {
      errorMessage: '',
      value
    };

    this.type = type;
    this.label = label;
    this.modelProp = modelProp;
    this.validateOn = validateOn;
    this.validators = validators;
    this.inputProps = inputProps;
    this.model = context.model;
  }

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  setup() {
    this.input.valid = this.validators ? false : true;

    if(this.validateOn === 'blur')
      this.input.addEventListener('blur', this.handle.bind(this));
    else
      this.input.addEventListener('input', this.handle.bind(this));
  }

  update(props) {
    this.setState(props);

    if(props && props.value)
      SetByDot(this.model, this.modelProp, props.value);
  }

  findError(inputValue) {
    return this.validators.find(validator => {
      const rule = validator.rule;

      if(typeof(rule) === 'string')
        return (Validator[rule] && !Validator[rule](inputValue));
      else if(rule instanceof Function)
        return (!rule(inputValue));
      else if(rule instanceof RegExp)
        return (!rule.test(inputValue));
      else
        throw new Error('The validators can be only functions, strings or regexs.');
    });
  }

  clearError() {
    this.input.valid = true;
    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.input.valid = false;
    this.setState({ errorMessage });
    SetByDot(this.model, this.modelProp, '');
  }

  handle() {
    this.setState({ value: this.input.value });

    if(this.validators) {
      const error = this.findError(this.input.value);

      this.clearError();

      error
        ? this.setError(error.errorMessage)
        : SetByDot(this.model, this.modelProp, this.input.value);
    }

    PubSub.publish('data', this.input.value);
  }

  render() {
    return (
      <div className={this.state.errorMessage ? 'field error' : 'field'}>
        <label htmlFor={this.label}>{this.label}</label>
        <input
          id={this.label}
          type={this.type}
          value={this.state.value || ''}
          ref={input => this.input = input}
          {...this.inputProps}
        />
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}

Input.contextTypes = {
  model: React.PropTypes.object
};
