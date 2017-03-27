import React, { Component } from 'react';
import Emitter from '../utils/emitter';
import SetByDot from '../utils/set-by-dot';

export default class InputFile extends Component {
  constructor(props, context) {
    super();

    const { clearButton, children, type, label, disabled, value, placeholder, modelProp, required, ...inputFileProps } = props;

    if(type && type !== 'file') {
      throw new Error('InputFile component only works with type file.');
    }

    this.state = {
      disabled,
      fileName: value || placeholder,
      value,
      errorMessage: ''
    };

    this.clearButton = clearButton;
    this.children = children;
    this.label = label;
    this.placeholder = placeholder;
    this.modelProp = modelProp;
    this.required = required;
    this.inputFileProps = inputFileProps;
    this.model = context.model;
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

    this.inputFile.valid = valid;

    this.inputFile.addEventListener('change', this.handle.bind(this));

    this.setValue(this.props);

    Emitter.emit('new-input', [this.inputFile]);
  }

  update(props) {
    this.setState(props);
    this.setValue(props);
  }

  setValue(props) {
    if(props && props.value) {
      SetByDot(this.model, this.modelProp, props.value);
    }
  }

  clearError() {
    this.inputFile.valid = true;
    this.setState({ errorMessage: '' });
  }

  setError(errorMessage) {
    this.inputFile.valid = false;
    this.setState({ errorMessage });
    SetByDot(this.model, this.modelProp, '');
  }

  handle() {
    const file = this.inputFile.files[0];

    if(file) {
      const reader = new FileReader();

      reader.onloadend = event => {
        this.clearError();

        this.setState({
          value: this.inputFile.value,
          fileName: file.name
        });

        Emitter.emit('input-data', event.target.result);

        SetByDot(this.model, this.modelProp, event.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  clearData() {
    if(this.required) {
      this.clearError();
      this.setError(this.required.errorMessage);
    }

    this.setState({
      value: '',
      fileName: this.placeholder
    });

    Emitter.emit('input-data', event.target.result);
  }

  render() {
    return (
      <div
        style={{ padding: '0 0 15px 0' }}
        className={this.state.errorMessage ? 'field field--error' : 'field'}
      >
        <label>{this.label}</label>
        <div className='input-file'>
          <div>
            <input
              disabled={this.state.disabled}
              type='file'
              ref={inputFile => this.inputFile = inputFile}
              value={this.state.value}
              {...this.inputFileProps}
            />
            <button
              disabled={this.state.disabled}
              type='button'
              onClick={() => this.inputFile.click()}
            >
              {this.children}
            </button>
          </div>
          <div className='content'>
            <span>{this.state.fileName}</span>
            {
              this.state.value && this.clearButton
                && <div>
                     <i
                       className='fa fa-times'
                       onClick={() => this.clearData()}
                     ></i>
                   </div>
            }
          </div>
        </div>
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}

InputFile.contextTypes = {
  model: React.PropTypes.object
};
