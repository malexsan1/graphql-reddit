import React from 'react'
import styled from 'styled-components'

import { Comment } from './'

const CommentThread = ({ isRoot, postId, rootComments, comments }) => {
  return (
    <Root isRoot={isRoot}>
      {rootComments.map(rootComment => (
        <Comment
          comments={comments}
          key={rootComment.id}
          postId={postId}
          subComments={comments.filter(c => c.parentId === rootComment.id)}
          {...rootComment}
        />
      ))}
    </Root>
  )
}

export default CommentThread

// #region styled-components
const Root = styled.div`
  align-self: stretch;
  margin-left: ${({ isRoot }) => (isRoot ? 0 : '20px')};
`
// #endregion
