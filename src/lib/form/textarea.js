import React, { Component } from 'react';
import Validator from 'validator';

import DeepSet from '../utils/deep-set';

export default class TextArea extends Component {
  constructor(props, context) {
    super();

    const { label, modelProp, validateOn, validators, ...inputProps } = props;

    this.state = { errorMessage: '' };

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
    this.setState(nextProps);
  }

  componentWillUnmount() {
    this.destroy();
  }

  setup() {
    if(this.validateOn === 'blur') {
      this.textarea.addEventListener('blur', this.validate.bind(this));
      this.textarea.addEventListener('input', this.clearError());
    } else {
      this.textarea.addEventListener('input', this.validate.bind(this));
    }
  }

  destroy() {
    if(this.validateOn === 'blur') {
      this.textarea.removeEventListener('blur', this.validate.bind(this));
      this.textarea.removeEventListener('input', this.clearError());
    } else {
      this.textarea.removeEventListener('input', this.validate.bind(this));
    }
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
          throw new Error('The validators can only be a function, string or regex.');
      }
    });
  }

  clearError() {
    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.setState({ errorMessage });
    DeepSet(this.model, this.modelProp, '');
  }

  validate(event) {
    if(this.validators) {
      let error = this.findError(this.textarea.value);

      this.clearError();

      error
        ? this.setError(error.errorMessage)
        : DeepSet(this.model, this.modelProp, this.textarea.value);
    } else {
      DeepSet(this.model, this.modelProp, this.textarea.value);
    }
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
          style={{borderColor: this.state.errorMessage ? 'red' : ''}}
          ref={textarea => this.textarea = textarea}
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
