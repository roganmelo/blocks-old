import React, { Component } from 'react';
import Validator from 'validator';
import Emitter from '../utils/emitter';
import SetByDot from '../utils/set-by-dot';

export default class Input extends Component {
  constructor(props, context) {
    super();

    const { type, disabled, value, label, modelProp, validateOn, validators, ...inputProps } = props;

    if(type && (type === 'checkbox' || type === 'radio')) {
      throw new Error('Input component doesnt works with types checkbox, radio or file.');
    }

    this.state = {
      disabled,
      value: value || '',
      errorMessage: ''
    };

    this.type = type;
    this.label = label;
    this.modelProp = modelProp;
    this.validateOn = validateOn;
    this.validators = validators || [];
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
    let valid = true;

    if(this.state.value) {
      valid = true;
    } else if(this.validators.length > 0) {
      valid = false;
    }

    this.input.valid = valid;

    if(this.validateOn === 'blur') {
      this.input.addEventListener('blur', this.handle.bind(this));
      this.input.addEventListener('input', () => this.setState({ value: this.input.value }));
    } else {
      this.input.addEventListener('input', this.handle.bind(this));
    }

    this.setValue(this.props);

    Emitter.emit('new-input', [this.input]);
  }

  update(props) {
    this.setState(props);
    this.setValue(props);
  }

  setValue(props) {
    if(props && props.value) {
      SetByDot(this.model, this.modelProp, props.value);
    }
  }

  findError(inputValue) {
    return this.validators.find(validator => {
      const rule = validator.rule;

      if(typeof(rule) === 'string') {
        return (Validator[rule] && !Validator[rule](inputValue));
      } else if(rule instanceof Function) {
        return (!rule(inputValue));
      } else if(rule instanceof RegExp) {
        return (!rule.test(inputValue));
      } else {
        throw new Error('The validators can be only functions, strings or regexs.');
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
    } else {
      SetByDot(this.model, this.modelProp, this.input.value);
    }

    Emitter.emit('input-data', this.input.value);
  }

  render() {
    return (
      <div className={this.state.errorMessage ? 'field field--error' : 'field'}>
        <label htmlFor={this.label}>{this.label}</label>
        <input
          id={this.label}
          type={this.type}
          disabled={this.state.disabled}
          value={this.state.value}
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
