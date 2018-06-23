import gql from 'graphql-tag'

export const GET_COMMENTS = gql`
  query comments($postId: String) {
    comments(postId: $postId) {
      id
      postId
      parentId
      content
      score
    }
  }
`
