import gql from 'graphql-tag'

export const GET_POSTS = gql`
  {
    posts {
      id
      title
      description
      url
      score
    }
  }
`