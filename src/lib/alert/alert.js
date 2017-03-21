import React, { Component } from 'react';

export default class Alert extends Component {
  constructor() {
    super();

    this.state = { closed: false };
  }

  render() {
    if(this.state.closed) {
      return false;
    }

    return (
      <div className={`alert ${this.props.type || 'info'}`}>
        {
          this.props.icon
            && <div className='icon'>
                 <i className={this.props.icon}></i>
               </div>
        }
        <div className='alert-content'>
          <div className='alert-header'>
            {this.props.title}
          </div>
          <div className='alert-text'>
            {this.props.children}
          </div>
        </div>
        {
          this.props.closeButton
            && <div>
                 <i
                   className='fa fa-times'
                   onClick={() => this.setState({ closed: true })}
                 ></i>
               </div>
        }
      </div>
    );
  }
}
