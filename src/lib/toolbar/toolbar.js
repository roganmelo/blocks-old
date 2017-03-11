import React, { Component } from 'react';
import Emitter from '../utils/emitter';

export default class Toolbar extends Component {
  render() {
    return (
      <div className='toolbar'>
        <div className='title'>{this.props.title}</div>
        <div className='actions'>
          {
            this.props.searchInputPlaceholder
              && <div className='search'>
                   <i className='fa fa-search'></i>
                   <input type='text' placeholder={this.props.searchInputPlaceholder} />
                 </div>
          }
          <ul>
            {
              Array.isArray(this.props.children)
                ? this.props.children.map((child, index) => <li key={index}>{child}</li>)
                : <li>{this.props.children}</li>
            }
            {
              this.props.auxiliaryButton
                && <li
                     className='auxiliary-button'
                     onClick={() => Emitter.emit('show-auxiliary')}
                   >
                     <i className={this.props.auxiliaryButton.icon}></i>
                     {this.props.auxiliaryButton.label}
                   </li>
            }
          </ul>
        </div>
      </div>
    );
  }
}
