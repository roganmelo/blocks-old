import React from 'react';

import { Badge } from '../../lib/badge';

export default ({ children }) => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Badge</h1>

    <Badge type='success'>10</Badge>
    <Badge type='info'>20</Badge>
    <Badge type='warning'>30</Badge>
    <Badge type='danger'>40</Badge>

    <pre>
      <code>
        {
          `
            <Badge type='success'>10</Badge>
            <Badge type='info'>20</Badge>
            <Badge type='warning'>30</Badge>
            <Badge type='danger'>40</Badge>
          `
        }
      </code>
    </pre>
  </div>
);
