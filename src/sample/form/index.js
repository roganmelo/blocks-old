import React, { Component } from 'react';

import { Form, Input, Dropdown, CheckboxGroup, RadioGroup, InputFile, ProfileImage, TextArea, Button } from '../../lib/form';

export default class FormSample extends Component {
  constructor() {
    super();

    this.foo = {
      checkboxes: []
    };
  }

  click() {
    console.log(this.foo);
  }

  render() {
    return (
      <div style={{ maxWidth: '600px', paddingTop: '50px', margin: '0 auto' }}>
        <Form model={this.foo}>
          <h1>Form</h1>

          <ProfileImage
            circular={true}
            modelProp='photo'
          >
            Choose
          </ProfileImage>

          <Input
            type='text'
            label='Input'
            value='foo'
            placeholder='Input'
            modelProp='input'
            validateOn='change'
            validators={[
              { rule: v => v !== '', errorMessage: 'Input is required.' },
              { rule: /foo/, errorMessage: 'Input invalid format.' }
            ]}
          />
        <InputFile
            clearButton={true}
            placeholder='No file.'
            label='File'
            required={{errorMessage: 'File is required.'}}
            modelProp='file'
          >
            Choose
          </InputFile>
          <Dropdown
            label='Dropdown'
            value='321321'
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
          <CheckboxGroup
            title='Checkboxes'
            values={['123123', '987987']}
            modelProp='checkboxes'
            minRequired={{
              min: 2,
              errorMessage: 'At least two items must be checked.'
            }}
            options={[
              { key: '123123', label: 'item 1', disabled: true },
              { key: '321321', label: 'item 2' },
              { key: '987987', label: 'item 3' },
              { key: '789789', label: 'item 4' }
            ]}
            optionKeyProp='key'
            optionLabelProp='label'
            optionDisabledProp='disabled'
          />
          <RadioGroup
            title='Radios'
            name='radios'
            value='321321'
            modelProp='radio'
            required={true}
            options={[
              { key: '123123', label: 'item 1' },
              { key: '321321', label: 'item 2' },
              { key: '987987', label: 'item 3' },
              { key: '789789', label: 'item 4' }
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
        <pre style={{ maxWidth: '600px', margin: '0 auto' }}>
          <code>
            {
              `
                <Form model={this.foo}>
                  <h1>Form</h1>

                  <ProfileImage
                    circular={true}
                    modelProp='photo'
                    text='Choose'
                  />

                  <Input
                    type='text'
                    label='Input'
                    value='foo'
                    placeholder='Input'
                    modelProp='input'
                    validateOn='change'
                    validators={[
                      { rule: v => v !== '', errorMessage: 'Input is required.' },
                      { rule: /foo/, errorMessage: 'Input invalid format.' }
                    ]}
                  />
                  <InputFile
                    closeButton={true}
                    placeholder='No file.'
                    label='File'
                    required={{errorMessage: 'File is required.'}}
                    modelProp='file'
                  >
                    Choose
                  </InputFile>
                  <Dropdown
                    label='Dropdown'
                    value='321321'
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
                  <CheckboxGroup
                    title='Checkboxes'
                    values={['123123', '987987']}
                    modelProp='checkboxes'
                    minRequired={{
                      min: 2,
                      errorMessage: 'At least two items must be checked.'
                    }}
                    options={[
                      { key: '123123', label: 'item 1', disabled: true },
                      { key: '321321', label: 'item 2' },
                      { key: '987987', label: 'item 3' },
                      { key: '789789', label: 'item 4' }
                    ]}
                    optionKeyProp='key'
                    optionLabelProp='label'
                    optionDisabledProp='disabled'
                  />
                  <RadioGroup
                    title='Radios'
                    name='radios'
                    value='321321'
                    modelProp='radio'
                    required={true}
                    options={[
                      { key: '123123', label: 'item 1' },
                      { key: '321321', label: 'item 2' },
                      { key: '987987', label: 'item 3' },
                      { key: '789789', label: 'item 4' }
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
              `
            }
          </code>
        </pre>
      </div>
    );
  }
}
