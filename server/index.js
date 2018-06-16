const uuid = require('uuid').v4
const bcrypt = require('bcrypt')
const { merge } = require('lodash')
const jwt = require('jsonwebtoken')
const { ApolloServer, gql } = require('apollo-server')

const config = require('./config')
const MongoClient = require('mongodb').MongoClient
const mongoURL = `mongodb://malexsan:password@ds251179.mlab.com:51179/reddit-clone`

const posts = require('./posts')
const comments = require('./comments')

const typeDefs = [
  gql`
    type Query
    type Mutation

  `,
  posts.schema,
  comments.schema,
  gql`
    extend type Mutation {
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

  `,
]

const resolvers = merge({}, posts.resolvers, comments.resolvers)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: async ({ req }) => {
  //   const reqToken = req.headers.authorization.split(' ')[1]
  //   const { iat, exp, ...user } = jwt.verify(reqToken, config.TOKEN_SECRET)
  //   return {
  //     user,
  //   }
  // },
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
