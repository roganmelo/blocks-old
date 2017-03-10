import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Row extends Component {
  constructor(props, context) {
    super();

    const { model, hasCheckbox, selectable, ...rowProps } = props;

    this.state = { checked: false };

    this.model = model;
    this.hasCheckbox = hasCheckbox;
    this.selectable = selectable;
    this.rowProps = rowProps;
  }

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    this.model = nextProps.model;
  }

  setup() {
    Emitter.on('toggle-check-all', checked => checked ? this.check() : this.uncheck());

    this.checkbox.addEventListener('click', () => this.state.checked ? this.uncheck() : this.check());
  }

  check() {
    this.setState({ checked: true });
    this.model.checked = true;
  }

  uncheck() {
    this.setState({ checked: false });
    this.model.checked = false;
    Emitter.emit('uncheck');
  }

  render() {
    return (
      <tr
        className={this.state.checked ? 'selected' : '' + this.selectable ? 'selectable' : ''}
        {...this.rowProps}
      >
        {
          this.hasCheckbox
            && <td>
                 <input
                   type='checkbox'
                   checked={this.state.checked}
                   ref={checkbox => this.checkbox = checkbox}
                 />
               </td>
        }
        {this.props.children}
      </tr>
    );
  }
}
