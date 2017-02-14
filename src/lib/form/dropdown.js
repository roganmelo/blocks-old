import React, { Component } from 'react';

import DeepSet from '../utils/deep-set';

export default class Dropdown extends Component {
  constructor(props, context) {
    super();

    const { modelProp, required, validateOn, defaultOption, options, keyProp, labelProp, ...selectProps } = props;

    this.state = {
      options,
      errorMessage: ''
    };

    this.modelProp = modelProp;
    this.required = required;
    this.validateOn = validateOn;
    this.defaultOption = defaultOption;
    this.keyProp = keyProp;
    this.labelProp = labelProp;
    this.selectProps = selectProps;
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
    this.select.addEventListener('change', this.validate.bind(this));
  }

  destroy() {
    this.select.removeEventListener('change', this.validate.bind(this));
  }

  clearError() {
    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.setState({ errorMessage });
    DeepSet(this.model, this.modelProp, '');
  }

  validate() {
    if(this.required) {
      this.clearError();

      this.select.value === this.defaultOption.key
        ? this.setError(this.required.errorMessage)
        : DeepSet(this.model, this.modelProp, this.select.value);
    } else {
      DeepSet(this.model, this.modelProp, this.select.value);
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
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select
          style={{borderColor: this.state.errorMessage ? 'red' : ''}}
          ref={select => this.select = select}
          {...this.selectProps}
        >
          {
            this.defaultOption && <option value={this.defaultOption.key}>{this.defaultOption.label}</option>
          }
          {
            this.state.options.map(o =>
              <option
                key={o[this.keyProp]}
                value={o[this.keyProp]}
              >
                {o[this.labelProp]}
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
