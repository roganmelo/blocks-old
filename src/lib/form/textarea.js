import React, { Component } from 'react';
import Validator from 'validator';
import PubSub from 'pubsub-js';

import DeepSet from '../utils/deep-set';

export default class TextArea extends Component {
  constructor(props, context) {
    super();

    const { label, value, modelProp, validateOn, validators, onBlur, onChange, ...inputProps } = props;

    this.state = {
      errorMessage: '',
      value
    };

    this.label = label;
    this.modelProp = modelProp;
    this.validateOn = validateOn;
    this.validators = validators;
    this.onBlur = onBlur;
    this.onChange = onChange;
    this.inputProps = inputProps;
    this.model = context.model;
  }

  componentDidMount() {
    if(this.validators) {
      if(this.state.value) {
        this.validate();
      }
    } else {
      this.textarea.valid = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  componentWillUnmount() {
    this.destroy();
  }

  typeOf(validator) {
    if(typeof(validator) === 'string') return 'string';
    else if(validator instanceof Function) return 'function';
    else if(validator instanceof RegExp) return 'regexp';
  }

  findError(inputValue) {
    return this.validators.find(v => {
      switch (this.typeOf(v.validator)) {
        case 'string':
          return (Validator[v.validator] && !Validator[v.validator](inputValue));
        case 'function':
          return (!v.validator(inputValue));
        case 'regexp':
          return (!v.validator.test(inputValue));
        default:
          throw new Error('The validators only be a function, string or regex.');
      }
    });
  }

  clearError() {
    this.textarea.valid = true;

    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.textarea.valid = false;

    this.setState({ errorMessage });

    DeepSet(this.model, this.modelProp, '');
  }

  validate() {
    PubSub.publish('data', this.textarea.value);

    if(this.validators) {
      let error = this.findError(this.textarea.value);

      this.clearError();

      error
        ? this.setError(error.errorMessage)
        : DeepSet(this.model, this.modelProp, this.textarea.value);
    } else {
      this.textarea.valid = true;

      DeepSet(this.model, this.modelProp, this.textarea.value);
    }
  }

  handleBlur(event) {
    if(this.validateOn === 'blur') {
      this.validate();
      this.setState({ errorMessage: '' });
    }

    this.setState({ value: event.target.value });

    if(this.onBlur)
      this.onBlur();
  }

  handleChange(event) {
    if(this.validateOn === 'change') this.validate();

    this.setState({ value: event.target.value });

    if(this.onChange) this.onChange();
  }

  render() {
    const spanStyle = {
      position: 'absolute',
      right: '0',
      bottom: '-1px',
      fontSize: '11px',
      color: '#f00',
      textTransform: 'uppercase',
      fontWeight: '400'
    };

    return (
      <div style={{position: 'relative'}}>
        <label htmlFor={this.props.id}>{this.label}</label>
        <textarea
          value={this.state.value || ''}
          style={{borderColor: this.state.errorMessage ? 'red' : ''}}
          ref={textarea => this.textarea = textarea}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          {...this.inputProps}
        ></textarea>
        {
          this.state.errorMessage && <span style={spanStyle}>{this.state.errorMessage}</span>
        }
      </div>
    );
  }
}

TextArea.contextTypes = {
  model: React.PropTypes.object
};
