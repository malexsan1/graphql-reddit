import gql from 'graphql-tag'

export const ADD_COMMENT = gql`
  mutation addComment($postId: String, $parentId: String, $content: String) {
    addComment(postId: $postId, parentId: $parentId, content: $content) {
      id
      postId
      parentId
      content
      score
    }
  }
`

export const RATE_COMMENT = gql`
  mutation rateComment($commentId: String, $rating: Int) {
    rateComment(commentId: $commentId, rating: $rating) {
      id
      postId
      parentId
      content
      score
    }
  }
`
