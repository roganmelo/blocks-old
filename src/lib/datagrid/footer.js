import React, { Component } from 'react';

export default class Footer extends Component {
  constructor(props, context) {
    super();

    const { colSpan, ...tfootProps } = props;

    if(!colSpan) throw new Error('Footer colSpan needs to be setted.');

    this.colSpan = colSpan;
    this.tfootProps = tfootProps;
    this.data = context.data;
  }

  render() {
    return (
      <tfoot {...this.tfootProps}>
        <tr>
          <td colSpan={this.colSpan}>
            {
              this.props.children
                ? this.props.children
                : this.data.length
            }
          </td>
        </tr>
      </tfoot>
    );
  }
}

Footer.contextTypes = {
  data: React.PropTypes.array,
  updateDataCallback: React.PropTypes.func
};
