import React from 'react'
import { Mutation } from 'react-apollo'
import { withHandlers } from 'recompose'

import { postsMutations } from '../gql'
import { Rating } from '../../UIComponents'

const PostScore = ({ ratePost, score }) => (
  <Mutation mutation={postsMutations.RATE_POST}>
    {mutateFn => (
      <Rating
        rating={score}
        onIncrement={ratePost(mutateFn, 1)}
        onDecrement={ratePost(mutateFn, -1)}
      />
    )}
  </Mutation>
)

export default withHandlers({
  ratePost: ({ id }) => (mutateFn, rating = 1) => () =>{
    mutateFn({ variables: { id, rating } })
  },
})(PostScore)
