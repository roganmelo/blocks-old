import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import SetByDotArray from '../utils/set-by-dot-array';

export default class CheckboxGroup extends Component {
  constructor(props, context) {
    super();

    const { title, type, options, values, name, modelProp, minRequired, optionKeyProp, optionLabelProp, ...checkboxProps } = props;

    if(type && type !== 'checkbox') throw new Error('CheckboxGroup component works only with type checkbox.');

    this.state = {
      options,
      values,
      errorMessage: ''
    };

    this.title = title;
    this.name = name;
    this.modelProp = modelProp;
    this.minRequired = minRequired;
    this.optionKeyProp = optionKeyProp;
    this.optionLabelProp = optionLabelProp;
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

  setValue(props) {
    const isChecked = true;

    if(props && props.values)
      props.values.forEach(value => SetByDotArray(this.model, this.modelProp, value, isChecked));
  }

  setup() {
    let valid = this.minRequired ? false : true;

    this.items.forEach(item => {
      item.valid = valid;
      item.addEventListener('click', this.handle.bind(this));
    });

    this.setValue(this.props);
  }

  update(props) {
    this.setState(props);
    this.setValue(props);
  }

  ref(checkbox) {
    if(checkbox && this.items.indexOf(checkbox) === -1)
      this.items.push(checkbox);
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
        if(curr.checked) prev++;
        return prev;
      }, 0);

      if(count < this.minRequired.min) {
        this.setError(this.minRequired.errorMessage);
        this.items.forEach(item => item.valid = false);
      } else {
        this.items.forEach(item => item.valid = true);
      }
    }

    SetByDotArray(this.model, this.modelProp, event.target.value, event.target.checked);

    PubSub.publish('data', event.target.value);
  }

  render() {
    return (
      <div className={this.state.errorMessage ? 'field error' : 'field'}>
        <label>{this.title}</label>
        <div className='container'>
          {
            this.state.options.map(option =>
              <div key={option[0][this.optionKeyProp]} className='row'>
                {
                  option.map(item =>
                    <label key={item[this.optionKeyProp]} htmlFor={item[this.optionKeyProp]}>
                      <input
                        id={item[this.optionKeyProp]}
                        type='checkbox'
                        name={this.name}
                        value={item[this.optionKeyProp]}
                        checked={this.state.values.includes(item[this.optionKeyProp])}
                        ref={this.ref.bind(this)}
                        {...this.checkboxProps}
                      />
                      {item[this.optionLabelProp]}
                    </label>
                  )
                }
              </div>
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
