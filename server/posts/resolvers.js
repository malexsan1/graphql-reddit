const uuid = require('uuid').v4

module.exports = {
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
  },
}
