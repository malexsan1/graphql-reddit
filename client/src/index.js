import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'

import App from './App'

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `http://localhost:3001/graphql` }),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
