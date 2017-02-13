import React, { Component } from 'react';

export default class Dropdown extends Component {
  constructor(props, context) {
    super();

    const { modelProp, required, validateOn, defaultOption, options, ...selectProps } = props;

    this.state = { errorMessage: '' };
    this.required = required;
    this.validateOn = validateOn;
    this.defaultOption = defaultOption;
    this.options = options;
    this.selectProps = selectProps;
    this.model = context.model[modelProp];
  }

  componentDidMount() {
    this.setup();
  }

  componentWillUnmount() {
    this.destroy();
  }

  setup() {
    if(this.validateOn === 'submit') this.select.form.addEventListener('submit', this.validate.bind(this));
    else this.select.addEventListener('change', this.validate.bind(this));
  }

  destroy() {
    // this.select.parentNode.replaceChild(this.select.cloneNode(true), this.select);

    if(this.validateOn === 'submit') this.select.form.removeEventListener('submit', this.validate.bind(this));
    else this.select.removeEventListener('change', this.validate.bind(this));
  }

  clearError() {
    this.setState({ errorMessage: '' });
    this.model = '';
  }

  setError(error) {
    const { errorMessage } = error;
    this.setState({ errorMessage });
  }

  validate() {
    if(this.required) {
      this.clearError();

      if(this.select.value === this.defaultOption.key) this.setError(this.required);
      else this.model = this.select.value;
    } else {
      this.model = this.select.value;
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
            this.options.map(o => <option key={o.key} value={o.key}>{o.label}</option>)
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
