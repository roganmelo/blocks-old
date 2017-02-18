import React, { Component } from 'react';
import Validator from 'validator';
import PubSub from 'pubsub-js';

import DeepSet from '../utils/deep-set';

export default class Input extends Component {
  constructor(props, context) {
    super();

    const { type, value, label, modelProp, validateOn, validators, onBlur, onChange, ...inputProps } = props;

    if(type === 'checkbox' || type === 'radio')
      throw new Error('Input doesnt works with types checkbox or radio.');

    this.state = {
      errorMessage: '',
      value
    };

    this.type = type;
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
    if(!this.validators) this.input.valid = true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);

    if(nextProps && nextProps.value) {
      DeepSet(this.model, this.modelProp, nextProps.value);
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
          throw new Error('The validators only be a function, string or regex.');
      }
    });
  }

  clearError() {
    this.input.valid = true;

    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.input.valid = false;

    this.setState({ errorMessage });

    DeepSet(this.model, this.modelProp, '');
  }

  validate() {
    PubSub.publish('data', this.input.value);

    if(this.validators) {
      let error = this.findError(this.input.value);

      this.clearError();

      error
        ? this.setError(error.errorMessage)
        : DeepSet(this.model, this.modelProp, this.input.value);
    }
  }

  handleBlur(event) {
    if(this.validateOn === 'blur') {
      this.validate();
      this.setState({ errorMessage: '' });
    } else {
      this.input.valid = true;
      DeepSet(this.model, this.modelProp, this.input.value);
    }

    this.setState({ value: event.target.value });

    if(this.onBlur) this.onBlur();
  }

  handleChange(event) {
    if(this.validateOn === 'change') {
      this.validate();
    } else {
      this.input.valid = true;
      DeepSet(this.model, this.modelProp, this.input.value);
    }

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
        <input
          type={this.type}
          value={this.state.value || ''}
          style={{borderColor: this.state.errorMessage ? 'red' : ''}}
          ref={input => this.input = input}
          onBlur={this.handleBlur.bind(this)}
          onChange={this.handleChange.bind(this)}
          {...this.inputProps}
        />
        {
          this.state.errorMessage && <span style={spanStyle}>{this.state.errorMessage}</span>
        }
      </div>
    );
  }
}

Input.contextTypes = {
  model: React.PropTypes.object
};
