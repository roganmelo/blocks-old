import React from 'react';

import { Alert } from '../../lib/alert';

export default ({ children }) => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Alerts</h1>

    <Alert
      icon='fa fa-check-circle'
      title='Your user registration was successful.'
      type='success'
      closeButton={true}
    >
      You may now log-in with the username you have chosen
    </Alert>
    <Alert
      icon='fa fa-info-circle'
      title='Was this what you wanted?'
      type='info'
      closeButton={true}
    >
      Did you know it's been a while?
    </Alert>
    <Alert
      icon='fa fa-exclamation-circle'
      title='You must register before you can do that!'
      type='warning'
      closeButton={true}
    >
      Visit our registration page, then try again
    </Alert>
    <Alert
      icon='fa fa-times-circle'
      title='There were some errors with your submission'
      type='danger'
      closeButton={true}
    >
      You must include both a upper and lower case letters in your password.
    </Alert>

    <pre>
      <code>
        {
          `
            <Alert
              title='Your user registration was successful.'
              type='success'
              closeButton={true}
            >
              You may now log-in with the username you have chosen
            </Alert>
            <Alert
              title='Was this what you wanted?'
              type='info'
              closeButton={true}
            >
              Did you know it's been a while?
            </Alert>
            <Alert
              title='You must register before you can do that!'
              type='warning'
              closeButton={true}
            >
              Visit our registration page, then try again
            </Alert>
            <Alert
              title='There were some errors with your submission'
              type='danger'
              closeButton={true}
            >
              You must include both a upper and lower case letters in your password.
            </Alert>
          `
        }
      </code>
    </pre>
  </div>
);
