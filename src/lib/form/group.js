import React, { Component } from 'react';

export default class Group extends Component {
  getChildContext() {
    return {
      model: this.props.model
    };
  }

  render() {
    return (
      <div>
        <label>{this.props.title}</label>
        <div className='container'>
          <div className='row'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Group.childContextTypes = {
  model: React.PropTypes.object
};
