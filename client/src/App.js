import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import { Comments } from './Comments/components'
import { Posts, PostAdder } from './Posts/components'

const App = () => (
  <Fragment>
    <Route exact path="/" component={Posts} />
    <Route path="/add-post" component={PostAdder} />
    <Route path="/comments/:postId" component={Comments} />
  </Fragment>
)

export default App
