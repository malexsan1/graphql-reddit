import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

import { Post } from './'
import { postsQueries } from '../gql'

const Posts = ({ goToAddPost, goToComments }) => (
  <Fragment>
    <div>
      <button onClick={goToAddPost}>Add post</button>
    </div>
    <Query query={postsQueries.GET_POSTS}>
      {({ data: { posts }, loading }) => {
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
const PostsContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
`
// #endregion
