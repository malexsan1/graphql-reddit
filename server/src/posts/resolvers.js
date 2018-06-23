const uuid = require('uuid').v4

module.exports = {
  Query: {
    posts: async (_, { subreddit }) => {
      const Posts = global.DB.collection('posts')
      const Subreddits = global.DB.collection('subreddits')

      if (subreddit) {
        const { id: subredditId } = await Subreddits.findOne({
          name: subreddit,
        })
        return await Posts.find({ subreddit: subredditId }).toArray()
      }

      return await Posts.find({}).toArray()
    },
    post: async (_, { id }) => {
      const Posts = global.DB.collection('posts')
      const post = await Posts.findOne({ id })
      return post
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
  Post: {
    comments: async post => {
      const Comments = global.DB.collection('comments')
      return await Comments.find({ postId: post.id }).toArray()
    },
    subreddit: async post => {
      const Subreddits = global.DB.collection('subreddits')
      return Subreddits.findOne({ id: post.subreddit })
    },
  },
}
