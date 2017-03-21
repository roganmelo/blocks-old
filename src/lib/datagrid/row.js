import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Row extends Component {
  constructor(props) {
    super();

    const { model, checkbox, selectable, ...rowProps } = props;

    this.state = { checked: false };

    this.model = model;
    this.checkbox = checkbox;
    this.selectable = selectable;
    this.rowProps = rowProps;
  }

  getChildContext() {
    return { selectableCallback: this.selectable.callback };
  }

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    this.model = nextProps.model;
  }

  setup() {
    Emitter.on('toggle-check-all', checked => checked ? this.check() : this.uncheck());

    if(this.checkbox) {
      this.checkbox.addEventListener('click', () => this.state.checked ? this.uncheck() : this.check());
    }
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
        className={this.state.checked ? 'checked' : '' + this.selectable ? 'selectable' : ''}
        {...this.rowProps}
      >
        {
          this.checkbox
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

Row.childContextTypes = { selectableCallback: React.PropTypes.func };
