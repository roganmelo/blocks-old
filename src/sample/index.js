import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Input, Dropdown } from '../lib';

ReactDOM.render((
  <div>
    <h1>App works!</h1>
    <Form model={{}}>
      <Input
        type='text'
        label='Field 1'
        placeholder='Field 1'
        modelProp='field1'
        validateOn='change'
        validators={[
          { validator: v => v !== '', errorMessage: 'Field is required.' },
          { validator: /W3Schools/g, errorMessage: 'Invalid format.' }
        ]}
      />
      <Dropdown
        label='Field 2'
        modelProp='field2'
        required={{errorMessage: 'Field is required'}}
        validateOn='change'
        defaultOption={{
          key: '',
          label: 'Choose one'
        }}
        options={[
          {
            key: '123123',
            label: 'option 1'
          },
          {
            key: '321321',
            label: 'option 2'
          }
        ]}
      />
    <button type='submit'>Save</button>
    </Form>
  </div>
), document.getElementById('root'));
