import gql from 'graphql-tag'

export const GET_POST = gql`
  query post($id: String!) {
    post(id: $id) {
      id
      title
      description
      score
      comments {
        id
        content
        score
        parentId
      }
    }
  }
`

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
