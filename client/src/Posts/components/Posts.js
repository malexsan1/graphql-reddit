import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

import { Post } from './'
import { postsQueries } from '../gql'
import { Subreddits } from '../../Subreddits/components'

const Posts = ({
  goTo,
  match: {
    params: { subreddit },
  },
}) => (
  <Fragment>
    <Subreddits />
    <Button onClick={goTo('/create-subreddit')}>Create subreddit</Button>
    <Button onClick={goTo('/add-post')}>Add post</Button>
    <Query query={postsQueries.GET_POSTS} variables={{ subreddit }}>
      {({ data: { posts = [] }, loading }) => {
        return loading ? (
          'Loading...'
        ) : (
          <PostsContainer>
            {posts.map(p => (
              <Post
                goToComments={goTo(`/comments/${p.id}`, { post: p })}
                key={p.id}
                {...p}
              />
            ))}
          </PostsContainer>
        )
      }}
    </Query>
  </Fragment>
)

export default compose(
  withHandlers({
    goTo: ({ history: { push } }) => (to, routeState = {}) => () => {
      push(to, routeState)
    },
  }),
)(Posts)

// #region styled-components
const Button = styled.button`
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
