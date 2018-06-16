const { gql } = require('apollo-server')

module.exports = gql`
  extend type Query {
    posts(subreddit: String): [Post]
    post(id: String!): Post
  }

  extend type Mutation {
    addPost(input: PostInput): Post
    ratePost(id: String!, rating: Int): Post
    deletePost(id: String): Post
  }

  type Post {
    id: String
    title: String
    description: String
    score: Int
    comments: [Comment]
    url: String
  }

  input PostInput {
    title: String
    description: String
    url: String
    subreddit: String
  }

`
