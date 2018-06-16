const uuid = require('uuid').v4

module.exports = {
  Query: {
    comments: async (_, { postId }) => {
      const comments = global.DB.collection('comments')
      return await comments.find({ postId }).toArray()
    },
  },
  Mutation: {
    addComment: async (_, { postId, parentId, content }) => {
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
  },
}
