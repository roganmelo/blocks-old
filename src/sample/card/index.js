import React from 'react';

import { Grid, Row, Column } from '../../lib/grid';
import { Card, Header, Content, MiniImage, Footer } from '../../lib/card';

export default () => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Cards</h1>

    <Grid>
      <Row>
        <Column>
          <Card>
            <Header>Header</Header>
            <Content title='Title'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Content>
            <Footer>
              <button className='button button-clear'>Action 1</button>
              <button className='button button-clear'>Action 2</button>
            </Footer>
          </Card>
        </Column>
        <Column>
          <Card>
            <Header
              image={{
                src: 'http://vmware.github.io/clarity/assets/images/documentation/cards/placeholder_350x150.png',
                alt: 'image'
              }}
            />
            <Content title='Title'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Content>
            <Footer>
              <button className='button button-clear'>Action 1</button>
              <button className='button button-clear'>Action 2</button>
              <button className='button button-clear'>Action 2</button>
            </Footer>
          </Card>
        </Column>
      </Row>

      <Row>
        <Column>
          <Card>
            <Content>
              <MiniImage
                src='http://i.pravatar.cc/150?img=5'
                alt='girl'
              >
                <div><strong>Luana Guimarães</strong></div>
                <div>Developer</div>
              </MiniImage>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Content>
            <Footer>
              <button className='button button-clear'>Action 1</button>
              <button className='button button-clear'>Action 2</button>
            </Footer>
          </Card>
        </Column>
      </Row>
    </Grid>

    <pre>
      <code>
        {
          `
            <Grid>
              <Row>
                <Column>
                  <Card>
                    <Header>Header</Header>
                    <Content title='Title'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Content>
                    <Footer>
                      <button className='button button-clear'>Action 1</button>
                      <button className='button button-clear'>Action 2</button>
                    </Footer>
                  </Card>
                </Column>
                <Column>
                  <Card>
                    <Header
                      image={{
                        src: 'http://vmware.github.io/clarity/assets/images/documentation/cards/placeholder_350x150.png',
                        alt: 'image'
                      }}
                    />
                    <Content title='Title'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Content>
                    <Footer>
                      <button className='button button-clear'>Action 1</button>
                      <button className='button button-clear'>Action 2</button>
                      <button className='button button-clear'>Action 2</button>
                    </Footer>
                  </Card>
                </Column>
              </Row>

              <Row>
                <Column>
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
                    <Footer>
                      <button className='button button-clear'>Action 1</button>
                      <button className='button button-clear'>Action 2</button>
                    </Footer>
                  </Card>
                </Column>
              </Row>
            </Grid>
          `
        }
      </code>
    </pre>
  </div>
);
