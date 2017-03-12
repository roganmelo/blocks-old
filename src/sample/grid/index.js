import React from 'react';

import { Grid, Row, Column } from '../../lib/grid';

const columnDemo = {
  background: '#d1d1d1',
  borderRadius: '.4rem',
  display: 'block',
  fontSize: '1rem',
  fontWeight: '600',
  height: '3rem',
  letterSpacing: '.1rem',
  lineHeight: '3rem',
  marginBottom: '2.5rem',
  textAlign: 'center',
  textTransform: 'uppercase'
}

export default ({ children }) => (
  <div style={{ padding: '50px 50px 0 50px' }}>
    <h1>Grid</h1>

    <Grid>
      <Row>
        <Column>
          <span style={columnDemo}>column 1</span>
        </Column>
      </Row>

      <Row>
        <Column>
          <span style={columnDemo}>column 1</span>
        </Column>
        <Column>
          <span style={columnDemo}>column 2</span>
        </Column>
      </Row>

      <Row>
        <Column>
          <span style={columnDemo}>column 1</span>
        </Column>
        <Column>
          <span style={columnDemo}>column 2</span>
        </Column>
        <Column>
          <span style={columnDemo}>column 3</span>
        </Column>
      </Row>

      <Row>
        <Column>
          <span style={columnDemo}>column 1</span>
        </Column>
        <Column>
          <span style={columnDemo}>column 2</span>
        </Column>
        <Column>
          <span style={columnDemo}>column 3</span>
        </Column>
        <Column>
          <span style={columnDemo}>column 4</span>
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
                  <span style={columnDemo}>column 1</span>
                </Column>
              </Row>

              <Row>
                <Column>
                  <span style={columnDemo}>column 1</span>
                </Column>
                <Column>
                  <span style={columnDemo}>column 2</span>
                </Column>
              </Row>

              <Row>
                <Column>
                  <span style={columnDemo}>column 1</span>
                </Column>
                <Column>
                  <span style={columnDemo}>column 2</span>
                </Column>
                <Column>
                  <span style={columnDemo}>column 3</span>
                </Column>
              </Row>

              <Row>
                <Column>
                  <span style={columnDemo}>column 1</span>
                </Column>
                <Column>
                  <span style={columnDemo}>column 2</span>
                </Column>
                <Column>
                  <span style={columnDemo}>column 3</span>
                </Column>
                <Column>
                  <span style={columnDemo}>column 4</span>
                </Column>
              </Row>
            </Grid>
          `
        }
      </code>
    </pre>
  </div>
);
