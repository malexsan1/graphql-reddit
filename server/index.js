const uuid = require('uuid').v4
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ApolloServer, gql } = require('apollo-server')

const MongoClient = require('mongodb').MongoClient
const config = require('./config')
const mongoURL = `mongodb://malexsan:password@ds251179.mlab.com:51179/reddit-clone`

const typeDefs = gql`
  type Query {
    posts: [Post]
    post(id: String!): Post
    comments(postId: String): [Comment]
  }
  type Mutation {
    addPost(input: PostInput): Post
    ratePost(id: String!, rating: Int): Post
    deletePost(id: String): Post
    addComment(postId: String, parentId: String, content: String): Comment
    rateComment(commentId: String, rating: Int): Comment
    signUpUser(input: SignUpInput): UserPayload
  }
  input SignUpInput {
    email: String
    password: String
    confirmPassword: String
  }
  type UserPayload {
    id: String
    email: String
    token: String
  }
  type Post {
    id: String
    title: String
    description: String
    score: Int
    comments: [Comment]
    url: String
  }
  type Comment {
    id: String
    postId: String
    parentId: String
    content: String
    score: Int
  }
  input PostInput {
    title: String
    description: String
    url: String
  }

`

const resolvers = {
  Query: {
    posts: async () => {
      const Posts = global.DB.collection('posts')
      return await Posts.find({}).toArray()
    },
    comments: async (_, { postId }) => {
      const comments = global.DB.collection('comments')
      return await comments.find({ postId }).toArray()
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
    addComment: async (_, { postId, parentId, content }) => {
      console.log('adding comment: ', postId, parentId, content)
      const comments = global.DB.collection('comments')

      const newComment = await comments.insertOne({
        id: uuid(),
        postId,
        parentId,
        content,
        score: 0,
      })
      return newComment.ops[0]
    },
    rateComment: async (_, { commentId, rating }) => {
      const comments = global.DB.collection('comments')
      const comment = await comments.findOneAndUpdate(
        {
          id: commentId,
        },
        {
          $inc: { score: rating },
        },
        {
          returnOriginal: false,
        },
      )
      return comment.value
    },
    signUpUser: async (_, { input: { email, password } }) => {
      const users = global.DB.collection('users')

      if (await users.findOne({ email })) {
        throw new Error(`Email is already being used.`)
      }

      const hash = await bcrypt.hash(password, 5)
      const id = uuid()
      const token = jwt.sign({ id, email }, config.TOKEN_SECRET, {
        expiresIn: config.TOKEN_LIFE,
      })
      const newUser = await users.insertOne({
        id,
        email,
        token,
      })
      return newUser.ops[0]
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const reqToken = req.headers.authorization.split(' ')[1]
    const { iat, exp, ...user } = jwt.verify(reqToken, config.TOKEN_SECRET)
    return {
      user,
    }
  },
})

MongoClient.connect(
  mongoURL,
  (err, client) => {
    global.DB = client.db('reddit-clone')
    server.listen().then(({ url }) => {
      console.log(`Server ready on ${url}.`)
    })
  },
)
