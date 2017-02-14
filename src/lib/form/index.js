import React, { Component } from 'react';

export default class Form extends Component {
  getChildContext() {
    return {
      model: this.props.model
    };
  }

  render() {
    return (
      <form noValidate>
        <fieldset>
          {this.props.children}
        </fieldset>
      </form>
    );
  }
}

Form.childContextTypes = {
  model: React.PropTypes.object
};
