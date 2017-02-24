import React, { Component } from 'react';

import { Loader } from '../lib/loader';

export default class LoaderSample extends Component {
  componentDidMount() {
    JSON.parse(this.props.params.show) ? Loader.show('Loading...') : Loader.hide();
  }

  render() {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }
}
