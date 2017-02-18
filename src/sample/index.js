import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Input, Dropdown, Checkbox, Radio, TextArea, Button } from '../lib/form';
import { Datagrid, Head, Column, Body, Row, Cell, Footer } from '../lib/datagrid';
import { Sidebar } from '../lib/sidebar';

ReactDOM.render((
  <div>
    <h1>App works!</h1>
    <Form model={{
      input: '',
      dropdown: {},
      field3: [],
      field4: '',
      textarea: ''
    }}>
      <Input
        type='text'
        label='Input'
        placeholder='Input'
        modelProp='input'
        validateOn='change'
        validators={[
          { validator: v => v !== '', errorMessage: 'Input is required.' },
          { validator: /W3Schools/g, errorMessage: 'Input invalid format.' }
        ]}
      />
      <Dropdown
        label='Dropdown'
        modelProp='dropdown'
        required={{errorMessage: 'Dropdown is required'}}
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
        optionKeyProp='key'
        optionLabelProp='label'
      />

      <Checkbox
        label='Foo'
        modelProp='field3'
        value='123123'
      />
      <Checkbox
        label='Bar'
        modelProp='field3'
        value='321321'
      />
      <Radio
        label='Lorem'
        modelProp='field4'
        name='field4'
        value='321321'
      />
      <Radio
        label='Ipsum'
        modelProp='field4'
        name='field4'
        value='123123'
      />
      <TextArea
        label='TextArea'
        placeholder='TextArea'
        modelProp='textarea'
        validateOn='change'
        validators={[
          { validator: v => v !== '', errorMessage: 'TextArea is required.' },
          { validator: /W3Schools/g, errorMessage: 'TextArea invalid format.' }
        ]}
      />
      <Button disableOnInvalid={false}>
        Save
      </Button>
    </Form>
    <Sidebar></Sidebar>
    <Datagrid>
      <Head>
        <Column>Company</Column>
        <Column>Admin</Column>
        <Column>Projects</Column>
      </Head>

      <Body>
        <Row>
          <Cell>Hook</Cell>
          <Cell>Self</Cell>
          <Cell>5</Cell>
        </Row>
        <Row>
          <Cell>Severino</Cell>
          <Cell>Self</Cell>
          <Cell>5</Cell>
        </Row>
      </Body>

      <Footer>
        Total: $180000
      </Footer>
    </Datagrid>
  </div>
), document.getElementById('root'));
