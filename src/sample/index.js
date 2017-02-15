import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Input, Dropdown, Checkbox, Radio, TextArea, Button } from '../lib';

ReactDOM.render((
  <div>
    <h1>App works!</h1>
    <Form model={{
      field1: '',
      field2: {},
      field3: [],
      field4: '',
      field5: ''
    }}>
      <Input
        type='text'
        label='Field 1'
        placeholder='Field 1'
        modelProp='field1'
        validateOn='change'
        validators={[
          { validator: v => v !== '', errorMessage: 'Field 1 is required.' },
          { validator: /W3Schools/g, errorMessage: 'Field 1 invalid format.' }
        ]}
      />
      <Dropdown
        label='Field 2'
        modelProp='field2'
        required={{errorMessage: 'Field 2 is required'}}
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
        keyProp='key'
        labelProp='label'
      />
      <Checkbox
        label='Field 3'
        modelProp='field3'
        value='123123'
      />
      <Checkbox
        label='Field 4'
        modelProp='field3'
        value='321321'
      />
      <Radio
        label='Field 5'
        modelProp='field4'
        name='field4'
        value='321321'
      />
      <Radio
        label='Field 5'
        modelProp='field4'
        name='field4'
        value='123123'
      />
      <TextArea
        label='Field 6'
        placeholder='Field 6'
        modelProp='field5'
        validateOn='change'
        validators={[
          { validator: v => v !== '', errorMessage: 'Field 6 is required.' },
          { validator: /W3Schools/g, errorMessage: 'Field 6 invalid format.' }
        ]}
      />
    <Button>Save</Button>
    </Form>
  </div>
), document.getElementById('root'));
