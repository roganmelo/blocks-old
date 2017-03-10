import React, { Component } from 'react';
import Emitter from '../utils/emitter';
import SetByDot from '../utils/set-by-dot-radio';

export default class RadioGroup extends Component {
  constructor(props, context) {
    super();

    const { title, type, disabled, options, value, name, modelProp, required,
      optionKeyProp, optionLabelProp, optionDisabledProp, ...radioProps } = props;

    if(type && type !== 'radio') {
      throw new Error('RadioGroup component works only with type radio.');
    }

    if(!name) {
      throw new Error('The property name is required.');
    }

    this.state = {
      disabled,
      options,
      value: value || '',
      errorMessage: ''
    };

    this.title = title;
    this.name = name;
    this.modelProp = modelProp;
    this.required = required;
    this.optionKeyProp = optionKeyProp;
    this.optionLabelProp = optionLabelProp;
    this.optionDisabledProp = optionDisabledProp;
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
    let valid = true;

    if(this.state.value) {
      valid = true;
    } else if(this.required) {
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
    if(props && props.value)
      SetByDot(this.model, this.modelProp, props.value, this.name);
  }

  ref(radio) {
    if(radio && this.items.indexOf(radio) === -1) {
      this.items.push(radio);
    }
  }

  handle(event) {
    this.setState({ value: event.target.value });

    this.items.forEach(item => {
      item.valid = true;
    });

    SetByDot(this.model, this.modelProp, event.target.value, this.name);

    Emitter.emit('data', event.target.value);
  }

  render() {
    return (
      <div className='field'>
        <label>{this.title}</label>
        <div className='field--inline'>
          {
            this.state.options.map(option =>
              <label key={option[this.optionKeyProp]} htmlFor={option[this.optionKeyProp]}>
                <input
                  id={option[this.optionKeyProp]}
                  type='radio'
                  name={this.name}
                  disabled={option[this.optionDisabledProp] || this.state.disabled}
                  value={option[this.optionKeyProp]}
                  defaultChecked={this.state.value && this.state.value === option[this.optionKeyProp]}
                  ref={this.ref.bind(this)}
                  {...this.radioProps}
                />
                {option[this.optionLabelProp]}
              </label>
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
