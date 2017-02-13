import React, { Component } from 'react';

export default class Radio extends Component {
  constructor(props, context) {
    super();

    const { type, name, label, modelProp, ...radioProps } = props;

    if(type && type !== 'radio') throw new Error('This component works only with radio.');
    if(!name) throw new Error('Name is required');

    this.label = label;
    this.name = name;
    this.radioProps = radioProps;
    this.model = context.model[modelProp];
  }

  componentDidMount() {
    this.setup();
  }

  componentWillUnmount() {
    this.destroy();
  }

  setup() {
    this.radio.addEventListener('click', this.setValue.bind(this));
  }

  destroy() {
    // this.select.parentNode.replaceChild(this.select.cloneNode(true), this.select);

    this.radio.removeEventListener('click', this.setValue.bind(this));
  }

  setValue() {
    this.model = this.radio.value;
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
