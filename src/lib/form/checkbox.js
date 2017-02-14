import React, { Component } from 'react';

import DeepSet from '../utils/deep-set';

export default class Checkbox extends Component {
  constructor(props, context) {
    super();

    const { type, label, modelProp, ...checkboxProps } = props;

    if(type && type !== 'checkbox')
      throw new Error('This component works only with checkbox.');

    this.label = label;
    this.modelProp = modelProp;
    this.checkboxProps = checkboxProps;
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
    this.checkbox.addEventListener('click', this.setValue.bind(this));
  }

  destroy() {
    this.checkbox.removeEventListener('click', this.setValue.bind(this));
  }

  setValue() {
    let isCheckbox = true;

    DeepSet(this.model, this.modelProp, this.checkbox.value, isCheckbox, this.checkbox.checked);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>
          <input
            type='checkbox'
            ref={checkbox => this.checkbox = checkbox}
            {...this.checkboxProps}
          />
          {this.label}
        </label>
      </div>
    );
  }
}

Checkbox.contextTypes = {
  model: React.PropTypes.object
};
