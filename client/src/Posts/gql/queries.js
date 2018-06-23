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
