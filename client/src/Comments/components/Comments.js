import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'

import { commentsQueries } from '../gql'
import { CommentAdder, Comment } from './'

const Comments = ({
  history: { goBack },
  match: {
    params: { postId },
  },
}) => (
  <Query query={commentsQueries.GET_POST} variables={{ id: postId }}>
    {({ loading, data: { post } }) => {
      return loading ? (
        'Loading...'
      ) : (
        <Root>
          <Header>
            <BackButton onClick={goBack}>Go back</BackButton>
            <Title>{post.title}</Title>
          </Header>
          <Description>{post.description}</Description>
          <CommentAdder postId={post.id} />
          {post.comments.map(c => (
            <Comment key={c.id} postId={postId} {...c} />
          ))}
        </Root>
      )
    }}
  </Query>
)

export default Comments

// #region styled-components
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

const Description = styled.span`
  color: #444;
  font-family: Helvetica, sans-serif;
  margin: 10px 0;
  text-align: justify;
  text-justify: distribute;
`

const Title = styled.span`
  flex: 1;
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`

const Root = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
// #endregion
