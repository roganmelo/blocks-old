import React from 'react';
import { browserHistory } from 'react-router';

import Accordion from './accordion';
import Item from './item';

export default ({ children, items, locale }) => (
  <div className='menu'>
    <ul>
      {
        items.map(item =>
          item.id
            ? <Accordion
                key={item.label}
                id={item.id}
                icon={item.icon}
                label={item.label}
                locale={locale}
                items={item.innerItems}
                selectedItem={browserHistory.getCurrentLocation().pathname.replace(`/${locale}`, '')}>
              </Accordion>
            : <Item
                active={item.path === browserHistory.getCurrentLocation().pathname.replace(`/${locale}`, '')}
                key={item.label}
                locale={locale}
                path={item.path}
                icon={item.icon}
                label={item.label}>
              </Item>
        )
      }
    </ul>
  </div>
);
