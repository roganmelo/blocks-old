import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Toolbar extends Component {
  render() {
    return (
      <div className='toolbar'>
        <div className='title'>{this.props.title}</div>
        <div className='actions'>
          {
            this.props.searchInput
              && <div className='search'>
                   <i className='fa fa-search'></i>
                   <input type='text' placeholder={this.props.searchInput.placeholder} />
                 </div>
          }
          <ul>
            {
              Array.isArray(this.props.children)
                ? this.props.children.map((child, index) => <li key={index}>{child}</li>)
                : <li>{this.props.children}</li>
            }
            {
              this.props.filterButtonLabel
                && <li
                     className='filter-button'
                     onClick={() => Emitter.emit('show-filters')}
                   >
                     <i className='fa fa-filter'></i>
                     {this.props.filterButtonLabel}
                   </li>
            }
          </ul>
        </div>
      </div>
    );
  }
}
