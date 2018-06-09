import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

import { Post } from './'
import { postsQueries } from '../gql'

const Posts = ({ goToAddPost, goToComments }) => (
  <Fragment>
    <BackButton onClick={goToAddPost}>Add post</BackButton>
    <Query query={postsQueries.GET_POSTS}>
      {({ data: { posts = [] }, loading }) => {
        return loading ? (
          'Loading...'
        ) : (
          <PostsContainer>
            {posts.map(p => (
              <Post goToComments={goToComments(p)} key={p.id} {...p} />
            ))}
          </PostsContainer>
        )
      }}
    </Query>
  </Fragment>
)

export default compose(
  withHandlers({
    goToAddPost: ({ history: { push } }) => () => {
      push(`/add-post`)
    },
    goToComments: ({ history: { push } }) => post => () => {
      push(`/comments/${post.id}`, {
        post,
      })
    },
  }),
)(Posts)

// #region styled-components
const BackButton = styled.button`
  background-color: #eee;
  border: none;
  border-radius: 2px;
  color: #444;
  height: 28px;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  margin: 10px;
  padding: 0 5px;

  &:hover {
    background-color: #ccc;
  }
`

const PostsContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
`
// #endregion
