import gql from 'graphql-tag'

export const GET_POSTS = gql`
  query posts($subreddit: String) {
    posts(subreddit: $subreddit) {
      id
      title
      description
      url
      score
    }
  }
`
