import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Pagination extends Component {
  constructor(props) {
    super();

    const { total, limit, changePageCallback, colSpan } = props;

    this.state = { actualPage: 1 };

    this.colSpan = colSpan;
    this.pages = total / limit;
    this.changePageCallback = changePageCallback;
  }

  choosePage(page) {
    Emitter.emit('uncheck');
    this.setState({ actualPage: page });
    this.changePageCallback(page);
  }

  render() {
    return (
      <tfoot className='pagination'>
        <tr>
          <td colSpan={this.colSpan}>
            <span className='resume'>{this.props.resume}</span>
            <ul className='pages'>
              {
                this.state.actualPage > 1
                  && <li onClick={this.choosePage.bind(this, this.state.actualPage - 1)}>
                       <i className='fa fa-chevron-left'></i>
                     </li>
              }
              {
                this.state.actualPage > 1
                  && <li onClick={this.choosePage.bind(this, 1)}>1</li>
              }
              {
                this.state.actualPage > 3
                  && <li className='disabled'>...</li>
              }
              {
                this.state.actualPage > 2
                  && <li
                       onClick={this.choosePage.bind(this, this.state.actualPage - 1)}
                     >
                       {this.state.actualPage - 1}
                     </li>
              }
                <li
                  className='active'
                  onClick={this.choosePage.bind(this, this.state.actualPage)}
                >
                  {this.state.actualPage}
                </li>
              {
                this.state.actualPage < this.pages.toFixed()
                  && <li
                       onClick={this.choosePage.bind(this, this.state.actualPage + 1)}
                     >
                       {this.state.actualPage + 1}
                     </li>
              }
              {
                this.pages.toFixed() - this.state.actualPage > 2
                  && <li className='disabled'>...</li>
              }
              {
                this.state.actualPage < this.pages.toFixed()
                  && (this.state.actualPage + 1) < this.pages.toFixed()
                  && <li
                       onClick={this.choosePage.bind(this, this.pages.toFixed())}
                     >
                       {this.pages.toFixed()}
                     </li>
              }
              {
                this.state.actualPage < this.pages.toFixed()
                  && <li onClick={this.choosePage.bind(this, this.state.actualPage + 1)}>
                       <i className='fa fa-chevron-right'></i>
                     </li>
              }
            </ul>
          </td>
        </tr>
      </tfoot>
    );
  }
}
