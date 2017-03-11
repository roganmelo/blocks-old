import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Head extends Component {
  constructor(props, context) {
    super();

    const { checkAll, ...headProps } = props;

    this.state = { checked: false };

    this.checkAll = checkAll;
    this.headProps = headProps;
    this.data = context.data;
    this.updateDataCallback = context.updateDataCallback;
  }

  getChildContext() {
    return {
      data: this.data,
      updateDataCallback: this.updateDataCallback
    };
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    Emitter.on('uncheck', () => this.setState({ checked: false }));

    this.checkbox.addEventListener('click', () => {
      this.setState({ checked: !this.state.checked });
      Emitter.emit('toggle-check-all', this.state.checked);
    });
  }

  render() {
    return (
      <thead {...this.headProps}>
        <tr>
          {
            this.checkAll
              && <th>
                   <input
                     type='checkbox'
                     checked={this.state.checked}
                     ref={checkbox => this.checkbox = checkbox}
                   />
                 </th>
          }
          {this.props.children}
        </tr>
      </thead>
    );
  }
}

const TYPES = {
  data: React.PropTypes.array,
  updateDataCallback: React.PropTypes.func
}

Head.contextTypes = TYPES;
Head.childContextTypes = TYPES
