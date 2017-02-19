import React, { Component } from 'react';

import { Form, Input, Dropdown, Checkbox, RadioGroup, TextArea, Button } from '../lib/form';

export default class FormSample extends Component {
  constructor() {
    super();

    this.foo = {};
  }

  click() {
    console.log(this.foo);
  }

  render() {
    return (
      <div>
        <h1>Form</h1>
        <Form model={this.foo}>
          <Input
            type='text'
            label='Input'
            placeholder='Input'
            modelProp='input'
            validateOn='change'
            validators={[
              { rule: v => v !== '', errorMessage: 'Input is required.' },
              { rule: /foo/g, errorMessage: 'Input invalid format.' }
            ]}
          />
          <Dropdown
            label='Dropdown'
            modelProp='dropdown'
            validateOn='change'
            required={{errorMessage: 'Dropdown is required.'}}
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
          <RadioGroup
            title='Radios'
            name='radios'
            value='123123'
            modelProp='radio'
            required={true}
            options={[
              [
                { key: '123213', label: 'item 1' },
                { key: '321321', label: 'item 2' },
              ],
              [
                { key: '987987', label: 'item 3' },
                { key: '789789', label: 'item 4' }
              ]
            ]}
            optionKeyProp='key'
            optionLabelProp='label'
          />
          <TextArea
            label='TextArea'
            placeholder='TextArea'
            modelProp='textarea'
            validateOn='change'
            validators={[
              { rule: v => v !== '', errorMessage: 'TextArea is required.' },
              { rule: /bar/g, errorMessage: 'TextArea invalid format.' }
            ]}
          />
          <Button
            disableOnInvalid={true}
            onClick={this.click.bind(this)}
          >
            Save
          </Button>
        </Form>
      </div>
    );
  }
}
