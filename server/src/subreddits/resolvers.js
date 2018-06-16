const uuid = require('uuid').v4

module.exports = {
  Query: {
    subreddits: async () => {
      const subreddits = global.DB.collection('subreddits')
      return await subreddits.find({}).toArray()
    },
  },
  Mutation: {
    addSubreddit: async (_, { input }) => {
      const subreddits = global.DB.collection('subreddits')
      const newSubreddit = await subreddits.insertOne({
        id: uuid(),
        ...input,
      })
      return newSubreddit.ops[0]
    },
  },
}
