import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

const Auth = ({ history }) => (
  <Root>
    <Button onClick={() => history.push('/sign-up')}>Sign up</Button>
    <Button onClick={() => history.push('/sign-up')}>Login</Button>
  </Root>
)

export default withRouter(Auth)

// #region styled components
const Root = styled.div`
  align-items: center;
  display: flex;
`

const Button = styled.button`
  background-color: #eee;
  border: none;
  border-radius: 2px;
  color: #444;
  height: 28px;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 10px;
  padding: 0 5px;

  &:hover {
    background-color: #ccc;
  }
`
// #endregion
