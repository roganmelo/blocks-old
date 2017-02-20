import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import SetByDot from '../utils/set-by-dot';

export default class Dropdown extends Component {
  constructor(props, context) {
    super();

    const { options, value, label, modelProp, validateOn, required, defaultOption, optionKeyProp, optionLabelProp, ...selectProps } = props;

    this.state = {
      options,
      value,
      errorMessage: ''
    };

    this.value = value;
    this.label = label;
    this.modelProp = modelProp;
    this.validateOn = validateOn;
    this.required = required;
    this.defaultOption = defaultOption;
    this.optionKeyProp = optionKeyProp;
    this.optionLabelProp = optionLabelProp;
    this.selectProps = selectProps;
    this.model = context.model;
  }

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  setValue(props) {
    if(props && props.value)
      SetByDot(this.model, this.modelProp, props.value);
  }

  setup() {
    this.select.valid = this.required ? false : true;

    if(this.validateOn === 'blur')
      this.select.addEventListener('blur', this.handle.bind(this));
    else
      this.select.addEventListener('change', this.handle.bind(this));

    this.setValue(this.props);
  }

  update(props) {
    this.setState(props);
    this.setValue(props);
  }

  clearError() {
    this.select.valid = true;
    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.select.valid = false;
    this.setState({ errorMessage });
    SetByDot(this.model, this.modelProp, '');
  }

  handle() {
    this.setState({ value: this.select.value });

    if(this.required) {
      this.clearError();

      this.select.value === this.defaultOption.key
        ? this.setError(this.required.errorMessage)
        : SetByDot(this.model, this.modelProp, this.select.value);
    } else {
      SetByDot(this.model, this.modelProp, this.select.value);
    }

    PubSub.publish('data', this.select.value);
  }

  render() {
    return (
      <div className={this.state.errorMessage ? 'field error' : 'field'}>
        <label htmlFor={this.label}>{this.label}</label>
        <select
          id={this.label}
          value={this.state.value || ''}
          ref={select => this.select = select}
          {...this.selectProps}
        >
          {
            this.defaultOption && <option value={this.defaultOption.key}>{this.defaultOption.label}</option>
          }
          {
            this.state.options.map(option =>
              <option
                key={option[this.optionKeyProp]}
                value={option[this.optionKeyProp]}
              >
                {option[this.optionLabelProp]}
              </option>
            )
          }
        </select>
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}

Dropdown.contextTypes = {
  model: React.PropTypes.object
};
