import React, { Component } from 'react';
import Emitter from '../utils/emitter';
import GetByDot from '../utils/get-by-dot';

export default class Column extends Component {
  constructor(props, context) {
    super();

    const { sortable, dataProp, ...thProps } = props;

    this.state = {
      data: context.data,
      className: ''
    };

    this.sortable = sortable;
    this.dataProp = dataProp;
    this.thProps = thProps;
    this.updateDataCallback = context.updateDataCallback;
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    Emitter.on('sort-datagrid', dataProp => {
      if(this.th && this.dataProp !== dataProp)
        this.setState({ className: '' });
    });

    Emitter.on('update-datagrid', data => this.setState({ data }));

    if(this.sortable)
      this.th.addEventListener('click', this.sort.bind(this));
  }

  sort() {
    if(this.state.className === '' || this.state.className === 'caret up') {
      this.setState({ className: 'caret' });

      this.updateDataCallback(this.state.data.sort((a, b) => {
        const prev = GetByDot(a, this.dataProp);
        const next = GetByDot(b, this.dataProp);

        if(!prev) return 1;
        if(!next) return -1;

        return prev.toString().localeCompare(next.toString());
      }));
    } else if(this.state.className === 'caret') {
      this.setState({ className: 'caret up' });

      this.updateDataCallback(this.state.data.sort((a, b) => {
        const prev = GetByDot(a, this.dataProp);
        const next = GetByDot(b, this.dataProp);

        if(!next) return 1;
        if(!prev) return -1;

        return next.toString().localeCompare(prev.toString());
      }));
    }

    Emitter.emit('sort-datagrid', this.dataProp);
  }

  render() {
    return (
      <th
        className={this.sortable ? 'sortable' : ''}
        ref={th => this.th = th}
        {...this.thProps}
      >
        {this.props.children}
        {
          this.sortable
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
