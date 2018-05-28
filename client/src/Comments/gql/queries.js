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
      }
    }
  }
`
