import React, { Component } from 'react';

import { Form, Input, Dropdown, CheckboxGroup, RadioGroup, TextArea, Button } from '../lib/form';

export default class FormSample extends Component {
  constructor() {
    super();

    this.foo = {
      checkbox: []
    };
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
            value='foo'
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
            value='123123'
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
          <CheckboxGroup
            title='Checkboxes'
            values={['123123']}
            modelProp='checkbox'
            minRequired={{
              min: 2,
              errorMessage: 'At least two items must be checked.'
            }}
            options={[
              [
                { key: '123123', label: 'item 1' },
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
          <RadioGroup
            title='Radios'
            name='radios'
            value='123123'
            modelProp='radio'
            required={true}
            options={[
              [
                { key: '123123', label: 'item 1' },
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
            value='bar'
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
