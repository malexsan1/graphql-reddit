import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import { SignUp } from './Auth/components'
import { Comments } from './Comments/components'
import { Posts, PostAdder } from './Posts/components'
import { CreateSubreddit } from './Subreddits/components'

const App = () => (
  <Fragment>
    <Route exact path="/" component={Posts} />
    <Route path="/r/:subreddit" component={Posts} />
    <Route path="/add-post" component={PostAdder} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/comments/:postId" component={Comments} />
    <Route path="/create-subreddit" component={CreateSubreddit} />
  </Fragment>
)

export default App
