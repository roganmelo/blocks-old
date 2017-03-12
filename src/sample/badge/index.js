import React from 'react';

import { Badge } from '../../lib/badge';

export default ({ children }) => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Badges</h1>

    <Badge color='#21ba45'>10</Badge>
    <Badge color='#2185d0'>20</Badge>
    <Badge
      color='#fbbd08'
      blackText={true}
    >
      30
    </Badge>
    <Badge color='#db2828'>40</Badge>

    <pre>
      <code>
        {
          `
            <Badge color='#21ba45'>10</Badge>
            <Badge color='#2185d0'>20</Badge>
            <Badge
              color='#fbbd08'
              blackText={true}
            >
              30
            </Badge>
            <Badge color='#db2828'>40</Badge>
          `
        }
      </code>
    </pre>
  </div>
);
