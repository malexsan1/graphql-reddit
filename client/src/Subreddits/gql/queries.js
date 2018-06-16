import gql from 'graphql-tag'

export const GET_SUBREDDITS = gql`
  {
    subreddits {
      id
      name
    }
  }
`
