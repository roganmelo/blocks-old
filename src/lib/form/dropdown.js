import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import DeepSet from '../utils/deep-set';

export default class Dropdown extends Component {
  constructor(props, context) {
    super();

    const { modelProp, value, required, onChange, defaultOption, options, optionKeyProp, optionLabelProp, ...selectProps } = props;

    this.state = {
      options,
      value,
      errorMessage: ''
    };

    this.value = value;
    this.modelProp = modelProp;
    this.required = required;
    this.onChange = onChange;
    this.defaultOption = defaultOption;
    this.optionKeyProp = optionKeyProp;
    this.optionLabelProp = optionLabelProp;
    this.selectProps = selectProps;
    this.model = context.model;
  }

  componentDidMount() {
    this.select.valid = this.required ? false : true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  clearError() {
    this.select.valid = true;

    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.select.valid = false;

    this.setState({ errorMessage });

    DeepSet(this.model, this.modelProp, '');
  }

  validate() {
    PubSub.publish('data', this.select.value);

    if(this.required) {
      this.clearError();

      this.select.value === this.defaultOption.key
        ? this.setError(this.required.errorMessage)
        : DeepSet(this.model, this.modelProp, this.select.value);
    } else {
      this.select.valid = true;

      DeepSet(this.model, this.modelProp, this.select.value);
    }
  }

  handleChange(event) {
    this.validate();

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
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select
          style={{borderColor: this.state.errorMessage ? 'red' : ''}}
          ref={select => this.select = select}
          onChange={this.handleChange.bind(this)}
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
        {
          this.state.errorMessage && <span style={spanStyle}>{this.state.errorMessage}</span>
        }
      </div>
    );
  }
}

Dropdown.contextTypes = {
  model: React.PropTypes.object
};
