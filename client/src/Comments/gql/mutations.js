import gql from 'graphql-tag'

export const ADD_COMMENT = gql`
  mutation addComment($postId: String, $content: String) {
    addComment(postId: $postId, content: $content) {
      id
      content
      score
    }
  }
`

export const RATE_COMMENT = gql`
  mutation rateComment($postId: String, $commentId: String, $rating: Int) {
    rateComment(postId: $postId, commentId: $commentId, rating: $rating) {
      id
      title
      description
      score
      comments {
        id
        content
        score
      }
    }
  }
`
