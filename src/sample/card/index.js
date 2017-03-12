import React from 'react';

import { Card, CardHeader, Content, MiniImage, CardFooter } from '../../lib/card';

export default ({ children }) => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Card</h1>

    <Card>
      <CardHeader>Header</CardHeader>
      <Content title='Title'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Content>
      <CardFooter>
        <button className='button button-clear'>Footer Action 1</button>
        <button className='button button-clear'>Footer Action 2</button>
        <button className='button button-clear'>Footer Action 3</button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader
        image={{
          src: 'http://vmware.github.io/clarity/assets/images/documentation/cards/placeholder_350x150.png',
          alt: 'image'
        }}
      />
      <Content title='Title'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Content>
    </Card>

    <Card>
      <Content>
        <MiniImage
          src='http://i.pravatar.cc/150?img=5'
          alt='girl'
        >
          <div>Luana Guimarães</div>
          <div>Developer</div>
        </MiniImage>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Content>
    </Card>

    <pre>
      <code>
        {
          `
            <Card>
              <CardHeader>Header</CardHeader>
              <Content title='Title'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Content>
              <CardFooter>
                <button className='button button-clear'>Footer Action 1</button>
                <button className='button button-clear'>Footer Action 2</button>
                <button className='button button-clear'>Footer Action 3</button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader
                image={{
                  src: 'http://vmware.github.io/clarity/assets/images/documentation/cards/placeholder_350x150.png',
                  alt: 'image'
                }}
              />
              <Content title='Title'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Content>
            </Card>

            <Card>
              <Content>
                <MiniImage
                  src='http://i.pravatar.cc/150?img=5'
                  alt='girl'
                >
                  <div>Luana Guimarães</div>
                  <div>Developer</div>
                </MiniImage>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Content>
            </Card>
          `
        }
      </code>
    </pre>
  </div>
);
