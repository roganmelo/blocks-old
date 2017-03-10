import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Head extends Component {
  constructor(props, context) {
    super();

    const { selectAllCheckbox, ...headProps } = props;

    this.state = { data: context.data };

    this.selectAllCheckbox = selectAllCheckbox;
    this.headProps = headProps;
    this.updateDataCallback = context.updateDataCallback;

    this.init();
  }

  getChildContext() {
    return {
      data: this.state.data,
      updateDataCallback: this.updateDataCallback
    };
  }

  componentDidMount() {
    this.setup();
  }

  init() {
    Emitter.on('uncheck', () => this.checkbox.checked = false);
    Emitter.on('update-datagrid', data => this.setState({ data }));
  }

  setup() {
    this.checkbox.addEventListener('click', () => Emitter.emit('toggle-check-all', this.checkbox.checked));
  }

  render() {
    return (
      <thead {...this.headProps}>
        <tr>
          {
            this.selectAllCheckbox
              && <th>
                   <input
                     type='checkbox'
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
