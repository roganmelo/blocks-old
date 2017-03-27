import React, { Component } from 'react';
import Emitter from '../utils/emitter';
import SetByDot from '../utils/set-by-dot-checkbox';

export default class CheckboxGroup extends Component {
  constructor(props, context) {
    super();

    const { type, disabled, options, values, title, modelProp, minRequired,
      optionKeyProp, optionLabelProp, optionDisabledProp, ...checkboxProps } = props;

    if(type && type !== 'checkbox') {
      throw new Error('CheckboxGroup component works only with type checkbox.');
    }

    this.state = {
      disabled,
      options,
      values: values || [],
      errorMessage: ''
    };

    this.title = title;
    this.modelProp = modelProp;
    this.minRequired = minRequired;
    this.optionKeyProp = optionKeyProp;
    this.optionLabelProp = optionLabelProp;
    this.optionDisabledProp = optionDisabledProp;
    this.checkboxProps = checkboxProps;
    this.model = context.model;
    this.items = [];
  }

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  setup() {
    let valid = true;

    if(this.state.values.length > 0) {
      valid = true;
    } else if(this.minRequired) {
      valid = false;
    }

    this.items.forEach(item => {
      item.valid = valid;
      item.addEventListener('click', this.handle.bind(this));
    });

    this.setValue(this.props);

    Emitter.emit('new-input', [...this.items]);
  }

  update(props) {
    this.setState(props);
    this.setValue(props);
  }

  setValue(props) {
    const isChecked = true;

    if(props && props.values) {
      props.values.forEach(value => SetByDot(this.model, this.modelProp, value, isChecked));
    }
  }

  ref(checkbox) {
    if(checkbox && this.items.indexOf(checkbox) === -1) {
      this.items.push(checkbox);
    }
  }

  clearError() {
    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.setState({ errorMessage });
  }

  handle(event) {
    if(event.target.checked) {
      this.setState({ values: [...this.state.values, event.target.value] });
    } else {
      const items = [...this.state.values];
      items.splice(items.indexOf(event.target.value), 1);
      this.setState({ values: items });
    }

    this.clearError();

    if(this.minRequired) {
      const count = this.items.reduce((prev, curr) => {
        if(curr.checked) {
          prev++;
        }

        return prev;
      }, 0);

      if(count < this.minRequired.min) {
        this.setError(this.minRequired.errorMessage);
        this.items.forEach(item => item.valid = false);
      } else {
        this.items.forEach(item => item.valid = true);
      }
    }

    SetByDot(this.model, this.modelProp, event.target.value, event.target.checked);

    Emitter.emit('input-data', event.target.value);
  }

  render() {
    return (
      <div className={this.state.errorMessage ? 'field field--error' : 'field'}>
        <label>{this.title}</label>
        <div className='field--inline'>
          {
            this.state.options.map(option =>
              <label key={option[this.optionKeyProp]} htmlFor={option[this.optionKeyProp]}>
                <input
                  id={option[this.optionKeyProp]}
                  type='checkbox'
                  disabled={option[this.optionDisabledProp] || this.state.disabled}
                  value={option[this.optionKeyProp]}
                  checked={this.state.values.length > 0 && this.state.values.includes(option[this.optionKeyProp])}
                  ref={this.ref.bind(this)}
                  {...this.checkboxProps}
                />
                {option[this.optionLabelProp]}
              </label>
            )
          }
        </div>
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}

CheckboxGroup.contextTypes = {
  model: React.PropTypes.object
};
