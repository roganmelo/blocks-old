import React from 'react';

import { Alert } from '../../lib/alert';

export default ({ children }) => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Alert</h1>

    <Alert
      title='Success'
      type='success'
      closeButton={true}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Alert>
    <Alert
      title='Info'
      type='info'
      closeButton={true}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Alert>
    <Alert
      title='Warning'
      type='warning'
      closeButton={true}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Alert>
    <Alert
      title='Danger'
      type='danger'
      closeButton={true}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Alert>

    <pre>
      <code>
        {
          `
            <Alert
              title='Success'
              type='success'
              closeButton={true}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Alert>
            <Alert
              title='Info'
              type='info'
              closeButton={true}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Alert>
            <Alert
              title='Warning'
              type='warning'
              closeButton={true}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Alert>
            <Alert
              title='Danger'
              type='danger'
              closeButton={true}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Alert>
          `
        }
      </code>
    </pre>
  </div>
);
