import React, { Component } from 'react';

export default class Checkbox extends Component {
  constructor(props, context) {
    super();

    const { type, label, modelProp, ...checkboxProps } = props;

    if(type && type !== 'checkbox') throw new Error('This component works only with checkbox.');

    this.label = label;
    this.checkboxProps = checkboxProps;
    this.model = context.model[modelProp];
  }

  componentDidMount() {
    this.setup();
  }

  componentWillUnmount() {
    this.destroy();
  }

  setup() {
    this.checkbox.addEventListener('click', this.setValue.bind(this));
  }

  destroy() {
    // this.select.parentNode.replaceChild(this.select.cloneNode(true), this.select);

    this.checkbox.removeEventListener('click', this.setValue.bind(this));
  }

  setValue() {
    if(!Array.isArray(this.model)) {
      this.model = this.checkbox.checked;
    } else {
      if(this.checkbox.checked) this.model.push(this.checkbox.value);
      else this.model.splice(this.model.indexOf(this.checkbox.value), 1);
    }
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
