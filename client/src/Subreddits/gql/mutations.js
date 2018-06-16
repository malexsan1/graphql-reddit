import gql from 'graphql-tag'

export const ADD_SUBREDDIT = gql`
  mutation addSubbreddit($input: SubredditInput) {
    addSubreddit(input: $input) {
      id
      name
    }
  }
`
