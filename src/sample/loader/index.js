import React, { Component } from 'react';

import { Loader } from '../../lib/loader';

export default class LoaderSample extends Component {
  componentDidMount() {
    JSON.parse(this.props.params.show) ? Loader.show() : Loader.hide();
  }

  render() {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '50px' }}>
        <div style={{ position: 'relative', height: '300px', maxWidth: '600px', border: '1px solid #d1d1d1' }}>
          <div className='spinner'>
            <div className='spinner--ball'></div>
            <p>Loading</p>
          </div>
        </div>
        <pre>
          <code>
            {
              `
                <Loader text='Loading'></Loader>

                Loader.show()
              `
            }
          </code>
        </pre>
      </div>
    );
  }
}
