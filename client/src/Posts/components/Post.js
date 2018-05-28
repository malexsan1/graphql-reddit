import React from 'react'
import styled from 'styled-components'

import { PostScore } from './'

const Post = ({ id, title, score, goToComments }) => (
  <Root>
    <PostScore id={id} score={score} />
    <Text>{title}</Text>
    <button onClick={goToComments}>Go to comments</button>
  </Root>
)
export default Post

// #region styled-components
const Text = styled.span`
  color: #555;
  flex: 1;
  font-family: Helvetica, sans-serif;
  font-weight: 100;
`

const Root = styled.div`
  align-items: center;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 6px;
`
// #endregion
