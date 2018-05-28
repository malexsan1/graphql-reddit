import React from 'react'
import styled from 'styled-components'

const FormButtons = ({ reset }) => (
  <Root>
    <Button type="submit">Submit</Button>
    <Button onClick={reset} type="button">
      Reset
    </Button>
  </Root>
)

export default FormButtons

// #region styled-components
const Button = styled.button`
  background-color: #ccc;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;

  height: 32px;
  width: 100px;

  &[type='submit'] {
    background-color: #6f99db;
  }

  &:active,
  &:focus {
    outline: none;
  }
`

const Root = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`
// #endregion
