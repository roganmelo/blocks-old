import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Datagrid extends Component {
  constructor(props) {
    super();

    const { data, placeholder, updateDataCallback, ...tableProps } = props;

    this.state = { data };

    this.placeholder = placeholder;
    this.updateDataCallback = updateDataCallback;
    this.tableProps = tableProps;
  }

  getChildContext() {
    return {
      data: this.state.data,
      updateDataCallback: this.updateDataCallback
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });

    Emitter.emit('update-datagrid', nextProps.data);
  }

  render() {
    return (
      <div className='datagrid'>
        {
          this.state.data.length === 0
            && <div className='placeholder'>
                 <i className='fa fa-frown-o'></i>
                 <p>{this.placeholder}</p>
               </div>
        }
        {
          this.state.data.length > 0
            && <table {...this.tableProps}>
                 {this.props.children}
               </table>
        }
      </div>
    );
  }
}

Datagrid.childContextTypes = {
  data: React.PropTypes.array,
  updateDataCallback: React.PropTypes.func
};
