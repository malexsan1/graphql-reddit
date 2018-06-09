import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { compose, withHandlers, withState } from 'recompose'

import { commentsMutations } from '../gql'
import { Rating } from '../../UIComponents'
import { CommentAdder, CommentThread } from './'

const Comment = ({
  id,
  score,
  postId,
  content,
  hasReply,
  children,
  rateComment,
  toggleReply,
  //
  comments,
  subComments,
}) => {
  return (
    <Mutation mutation={commentsMutations.RATE_COMMENT}>
      {mutateFn => (
        <Root>
          <Row>
            <Rating
              rating={score}
              onIncrement={rateComment(mutateFn, 1)}
              onDecrement={rateComment(mutateFn, -1)}
            />
            <Content>{content}</Content>
          </Row>
          <Row>
            <BackButton onClick={toggleReply}>
              {hasReply ? 'Cancel' : 'Reply'}
            </BackButton>
          </Row>
          {hasReply && <CommentAdder postId={postId} parentId={id} />}
          <CommentThread
            comments={comments}
            postId={postId}
            rootComments={subComments}
          />
        </Root>
      )}
    </Mutation>
  )
}

const EnhancedComment = compose(
  withState('hasReply', 'setReply', false),
  withHandlers({
    rateComment: ({ id: commentId }) => (mutateFn, rating = 1) => () => {
      mutateFn({ variables: { commentId, rating } })
    },
    toggleReply: ({ setReply }) => () => setReply(v => !v),
  }),
)(Comment)

export default EnhancedComment

// #region styled-components
const Content = styled.span`
  color: #444;
  display: flex;
  flex: 1;
  font-family: Helvetica, sans-serif;
  font-weight: 300;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`

const Root = styled.div`
  align-items: flex-start;
  box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px 0;
  padding: 5px;
`

const BackButton = styled.button`
  background-color: #eee;
  border: none;
  border-radius: 2px;
  color: #444;
  height: 28px;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  padding: 0 5px;

  &:hover {
    background-color: #ccc;
  }
`
// #endregion
