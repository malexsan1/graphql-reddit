const { gql } = require('apollo-server')

module.exports = gql`
  extend type Query {
    comments(postId: String): [Comment]
  }

  extend type Mutation {
    addComment(postId: String, parentId: String, content: String): Comment
    rateComment(commentId: String, rating: Int): Comment
  }

  type Comment {
    id: String
    postId: String
    parentId: String
    content: String
    score: Int
  }

`
