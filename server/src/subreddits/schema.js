const { gql } = require('apollo-server')

module.exports = gql`
  extend type Query {
    subreddits: [Subreddit]
    subreddit(subreddit: String): [Post]
  }

  extend type Mutation {
    addSubreddit(input: SubredditInput): Subreddit
  }

  type Subreddit {
    id: String
    name: String
  }

  input SubredditInput {
    name: String
  }

`
