import React from 'react';

import { Error } from '../../lib/error';

export default () => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Error</h1>

    <div style={{ height: '300px', border: '1px solid #d1d1d1' }}>
      <Error>Page not found.</Error>
    </div>

    <pre>
      <code>
        {
          `
            <Error>Page not found.</Error>
          `
        }
      </code>
    </pre>
  </div>
);
