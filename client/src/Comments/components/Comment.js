import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { withHandlers } from 'recompose'

import { commentsMutations } from '../gql'
import { Rating } from '../../UIComponents'

const Comment = ({ postId, id, content, score, rateComment }) => (
  <Mutation mutation={commentsMutations.RATE_COMMENT}>
    {mutateFn => (
      <Root>
        <Rating
          rating={score}
          onIncrement={rateComment(mutateFn, 1)}
          onDecrement={rateComment(mutateFn, -1)}
        />
        <Content>{content}</Content>
      </Root>
    )}
  </Mutation>
)

export default withHandlers({
  rateComment: ({ postId, id: commentId }) => (mutateFn, rating = 1) => () => {
    mutateFn({ variables: { commentId, postId, rating } })
  },
})(Comment)

// #region styled-components
const Content = styled.span`
  color: #444;
  display: flex;
  flex: 1;
  font-family: Helvetica, sans-serif;
  font-weight: 300;
`

const Root = styled.div`
  align-items: center;
  box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-start;
  margin: 3px 0;
`
// #endregion
