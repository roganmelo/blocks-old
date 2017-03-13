import React from 'react';

import { Label } from '../../lib/label';

export default () => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Labels</h1>

    <Label color='#21ba45'>success</Label>
    <Label color='#2185d0'>info</Label>
    <Label
      color='#fbbd08'
      blackText={true}
    >
      warning
    </Label>
    <Label color='#db2828'>error</Label>

    <pre>
      <code>
        {
          `
            <Label color='#21ba45'>10</Label>
            <Label color='#2185d0'>20</Label>
            <Label
              color='#fbbd08'
              blackText={true}
            >
              30
            </Label>
            <Label color='#db2828'>40</Label>
          `
        }
      </code>
    </pre>
  </div>
);
