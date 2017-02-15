import React, { Component } from 'react';

import DeepSet from '../utils/deep-set';

export default class Radio extends Component {
  constructor(props, context) {
    super();

    const { type, name, label, modelProp, ...radioProps } = props;

    if(type && type !== 'radio') throw new Error('Radio works only with type radio.');
    if(!name) throw new Error('The property name is required.');

    this.label = label;
    this.name = name;
    this.modelProp = modelProp;
    this.radioProps = radioProps;
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
    this.radio.addEventListener('click', this.setValue.bind(this));
  }

  destroy() {
    this.radio.removeEventListener('click', this.setValue.bind(this));
  }

  setValue() {
    DeepSet(this.model, this.modelProp, this.radio.value);
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>
          <input
            type='radio'
            name={this.name}
            ref={radio => this.radio = radio}
            {...this.radioProps}
          />
          {this.label}
        </label>
      </div>
    );
  }
}

Radio.contextTypes = {
  model: React.PropTypes.object
};
