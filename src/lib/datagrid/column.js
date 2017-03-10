import React, { Component } from 'react';
import Emitter from '../utils/emitter';
import GetByDot from '../utils/get-by-dot';

export default class Column extends Component {
  constructor(props, context) {
    super();

    const { detachable, dataProp, ...thProps } = props;

    this.state = {
      data: context.data,
      className: ''
    };

    this.detachable = detachable;
    this.dataProp = dataProp;
    this.thProps = thProps;
    this.updateDataCallback = context.updateDataCallback;

    this.init();
  }

  componentDidMount() {
    if(this.detachable)
      this.th.addEventListener('click', this.sort.bind(this));
  }

  init() {
    Emitter.on('sort-datagrid', (dataProp) => {
      if(this.dataProp !== dataProp)
        this.setState({ className: '' });
    });

    Emitter.on('update-datagrid', data => this.setState({ data }));
  }

  sort() {
    if(this.state.className === '' || this.state.className === 'caret up') {
      this.setState({ className: 'caret' });

      this.updateDataCallback(this.state.data.sort((a, b) =>
        GetByDot(a, this.dataProp).localeCompare(GetByDot(b, this.dataProp))));
    } else if(this.state.className === 'caret') {
      this.setState({ className: 'caret up' });

      this.updateDataCallback(this.state.data.sort((a, b) =>
        GetByDot(b, this.dataProp).localeCompare(GetByDot(a, this.dataProp))));
    }

    Emitter.emit('sort-datagrid', this.dataProp);
  }

  render() {
    return (
      <th
        className={this.detachable ? 'detachable' : ''}
        ref={th => this.th = th}
        {...this.thProps}
      >
        {this.props.children}
        {
          this.detachable
            && <span className={this.state.className}></span>
        }
      </th>
    );
  }
}

Column.contextTypes = {
  data: React.PropTypes.array,
  updateDataCallback: React.PropTypes.func
};
