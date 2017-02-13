import React, { Component } from 'react';
import Validator from 'validator';

export default class Input extends Component {
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

  componentWillUnmount() {
    this.destroy();
  }

  setup() {
    if(this.validators) {
      switch (this.validateOn) {
        case 'submit':
          this.input.form.addEventListener('submit', this.validate.bind(this));
          break;
        case 'blur':
          this.input.addEventListener('blur', this.validate.bind(this));
          this.input.addEventListener('input', this.clearError());
          break;
        default:
          this.input.addEventListener('input', this.validate.bind(this));
      }
    }
  }

  destroy() {
    if(this.validators) {
      // this.input.parentNode.replaceChild(this.input.cloneNode(true), this.input);

      switch (this.validateOn) {
        case 'submit':
          this.input.form.removeEventListener('submit', this.validate.bind(this));
          break;
        case 'blur':
          this.input.removeEventListener('blur', this.validate.bind(this));
          this.input.removeEventListener('input', this.clearError());
          break;
        default:
          this.input.removeEventListener('input', this.validate.bind(this));
      }
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
          throw new Error('Validator can only be a function, string or regex');
      }
    });
  }

  clearError() {
    this.setState({ errorMessage: '' });
    this.model[this.modelProp] = '';
  }

  setError(error) {
    const { errorMessage } = error;
    this.setState({ errorMessage });
  }

  validate(event) {
    let inputValue = this.input.value;
    let error = this.findError(inputValue);

    event.preventDefault();

    this.clearError();

    if(error) this.setError(error);
    else this.model[this.modelProp] = inputValue;
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
          style={{borderColor: this.state.errorMessage ? 'red' : ''}}
          ref={input => this.input = input}
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
