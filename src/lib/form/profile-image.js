import React, { Component } from 'react';
import SetByDot from '../utils/set-by-dot';

export default class ProfileImage extends Component {
  constructor(props, context) {
    super();

    const { circular, img, alt, text, modelProp, ...inputFileProps } = props;

    this.state = {
      img: img || 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRs1W3E6OUteYGpBgVKFQY43-D2-Ie-js_UCvUPQpzhDXXs4De2hQ',
      alt: alt || 'profile image',
      text: text || 'Change'
    };

    this.circular = circular;
    this.modelProp = modelProp;
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
    this.inputFile.addEventListener('change', this.handle.bind(this));
  }

  update(props) {
    this.setState(props);
  }

  handle() {
    [...this.inputFile.files].forEach(file => {
      const reader = new FileReader();

      reader.onloadend = event => {
        this.setState({ img: event.target.result });
        SetByDot(this.model, this.modelProp, event.target.result);
      };

      reader.readAsDataURL(file);
    })
  }

  render() {
    return (
      <div className='img-field'>
        <div
          className={this.circular ? 'img-field-content circular' : 'img-field-content'}
          onClick={() => this.inputFile.click()}
        >
          <img
            src={this.state.img}
            alt={this.state.alt}
          />
          <input
            type='file'
            accept='image/*'
            ref={inputFile => this.inputFile = inputFile}
          />
          <span>{this.state.text}</span>
        </div>
      </div>
    );
  }
}

ProfileImage.contextTypes = {
  model: React.PropTypes.object
};
