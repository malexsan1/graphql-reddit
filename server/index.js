const express = require('express')
const cors = require('cors')
const uuid = require('uuid').v4
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const { makeExecutableSchema } = require('graphql-tools')
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')

const mongoURL = `mongodb://malexsan:password@ds251179.mlab.com:51179/reddit-clone`

const posts = [
  {
    title: 'Learn React',
    author: 'Alexandru Munteanu',
  },
  {
    title: 'Learn GraphQL',
    author: 'Alexandru Munteanu',
  },
]

const typeDefs = `
  type Query {
    posts: [Post],
    post(id: String!): Post
  }
  type Mutation {
    addPost(input: PostInput): Post
    ratePost(id: String!, rating: Int): Post
    deletePost(id: String): Post
    addComment(postId: String, content: String): Comment
    rateComment(postId: String, commentId: String, rating: Int): Post
  }
  type Post {
    id: String,
    title: String,
    description: String,
    score: Int,
    comments: [Comment],
    url: String,
  }
  type Comment {
    id: String,
    content: String,
    score: Int,
  }
  input PostInput {
    title: String,
    description: String,
    url: String,
  }
`

const resolvers = {
  Query: {
    posts: async () => {
      const Posts = global.DB.collection('posts')
      return await Posts.find({}).toArray()
    },
    post: async (_, { id }) => {
      const Posts = global.DB.collection('posts')
      return await Posts.findOne({ id })
    },
  },
  Mutation: {
    addPost: async (_, { input }) => {
      const posts = global.DB.collection('posts')
      const newPost = await posts.insertOne({
        id: uuid(),
        description: '',
        comments: [],
        ...input,
        score: 0,
      })
      return newPost.ops[0]
    },
    ratePost: async (_, { id, rating }) => {
      const posts = global.DB.collection('posts')
      const updatedPost = await posts.findOneAndUpdate(
        { id },
        {
          $inc: { score: rating },
        },
        {
          returnOriginal: false,
        },
      )
      return updatedPost.value
    },
    deletePost: async (_, { id }) => {
      const posts = global.DB.collection('posts')
      return await posts.findAndRemove({ id })
    },
    addComment: async (_, { postId, content }) => {
      const posts = global.DB.collection('posts')
      const newComment = {
        id: uuid(),
        content,
        score: 0,
      }
      const updatedPost = await posts.findOneAndUpdate(
        { id: postId },
        {
          $push: { comments: newComment },
        },
        { returnOriginal: false },
      )
      return newComment
    },
    rateComment: async (_, { postId, commentId, rating }) => {
      const posts = global.DB.collection('posts')
      const theComment = await posts.findOneAndUpdate(
        {
          id: postId,
          'comments.id': commentId,
        },
        {
          $inc: { 'comments.$.score': rating },
        },
        {
          returnOriginal: false,
        },
      )
      return theComment.value
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// init the app
const app = express()
app.use(cors())

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

MongoClient.connect(mongoURL, (err, client) => {
  global.DB = client.db('reddit-clone')
  app.listen(3001, () => {
    console.log('Server listening on port 3001!')
  })
})
