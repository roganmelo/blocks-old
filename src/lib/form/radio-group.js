import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import './styles.scss';
import SetByDot from '../utils/set-by-dot';

export default class RadioGroup extends Component {
  constructor(props, context) {
    super();

    const { title, type, options, value, name, modelProp, required, optionKeyProp, optionLabelProp, ...radioProps } = props;

    if(type && type !== 'radio') throw new Error('Radio works only with type radio.');
    if(!name) throw new Error('The property name is required.');

    this.state = {
      options,
      value
    };

    this.title = title;
    this.name = name;
    this.modelProp = modelProp;
    this.required = required;
    this.optionKeyProp = optionKeyProp;
    this.optionLabelProp = optionLabelProp;
    this.radioProps = radioProps;
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
    const valid = this.required ? false : true;

    this.items.forEach(item => {
      item.valid = valid;
      item.addEventListener('click', this.handle.bind(this));
    });
  }

  update(props) {
    this.setState(props);

    if(props && props.value)
      SetByDot(this.model, this.modelProp, props.value);
  }

  ref(radio) {
    if(radio && this.items.indexOf(radio) === -1)
      this.items.push(radio);
  }

  handle(event) {
    this.setState({ value: event.target.value });

    this.items.forEach(item => {
      item.valid = true;
    });

    SetByDot(this.model, this.modelProp, event.target.value);

    PubSub.publish('data', event.target.value);
  }

  render() {
    return (
      <div>
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
                        type='radio'
                        name={this.name}
                        value={item[this.optionKeyProp]}
                        checked={this.state.value === item[this.optionKeyProp]}
                        ref={this.ref.bind(this)}
                        {...this.radioProps}
                      />
                      {item[this.optionLabelProp]}
                    </label>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

RadioGroup.contextTypes = {
  model: React.PropTypes.object
};
