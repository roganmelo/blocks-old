import React, { Component } from 'react';
import Validator from 'validator';
import PubSub from 'pubsub-js';

import './styles.scss';
import SetByDot from '../utils/set-by-dot';

export default class TextArea extends Component {
  constructor(props, context) {
    super();

    const { type, value, label, modelProp, validateOn, validators, ...textareaProps } = props;

    this.state = {
      errorMessage: '',
      value
    };

    this.type = type;
    this.label = label;
    this.modelProp = modelProp;
    this.validateOn = validateOn;
    this.validators = validators;
    this.textareaProps = textareaProps;
    this.model = context.model;
  }

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  setup() {
    this.textarea.valid = this.validators ? false : true;

    if(this.validateOn === 'blur')
      this.textarea.addEventListener('blur', this.handle.bind(this));
    else if(this.validateOn === 'change')
      this.textarea.addEventListener('input', this.handle.bind(this));
    else
      this.textarea.addEventListener('input', this.handle.bind(this));
  }

  update(props) {
    this.setState(props);

    if(props && props.value)
      SetByDot(this.model, this.modelProp, props.value);
  }

  findError(textareaValue) {
    return this.validators.find(validator => {
      const rule = validator.rule;

      if(typeof(rule) === 'string')
        return (Validator[rule] && !Validator[rule](textareaValue));
      else if(rule instanceof Function)
        return (!rule(textareaValue));
      else if(rule instanceof RegExp)
        return (!rule.test(textareaValue));
      else
        throw new Error('The validators can be only functions, strings or regexs.');
    });
  }

  clearError() {
    this.textarea.valid = true;
    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.textarea.valid = false;
    this.setState({ errorMessage });
    SetByDot(this.model, this.modelProp, '');
  }

  handle() {
    this.setState({ value: this.textarea.value });

    if(this.validators) {
      const error = this.findError(this.textarea.value);

      this.clearError();

      error
        ? this.setError(error.errorMessage)
        : SetByDot(this.model, this.modelProp, this.textarea.value);
    }

    PubSub.publish('data', this.textarea.value);
  }

  render() {
    return (
      <div className={this.state.errorMessage ? 'field error' : 'field'}>
        <label htmlFor={this.label}>{this.label}</label>
        <textarea
          id={this.label}
          value={this.state.value || ''}
          ref={textarea => this.textarea = textarea}
          {...this.textareaProps}
        ></textarea>
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}

TextArea.contextTypes = {
  model: React.PropTypes.object
};
