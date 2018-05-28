import gql from 'graphql-tag'

export const ADD_POST = gql`
  mutation addPost($input: PostInput!) {
    addPost(input: $input) {
      id
      title
      url
      score
      description
    }
  }
`

export const RATE_POST = gql`
  mutation ratePost($id: String!, $rating: Int) {
    ratePost(id: $id, rating: $rating) {
      id
      title
      score
    }
  }
`
