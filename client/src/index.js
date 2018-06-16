import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'

import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset'

import App from './App'
import baseStyles from './defaultStyles'

// const authLink = setContext((_, { headers, ...rest }) => {
//   const token = localStorage.getItem('token')
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   }
// })

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    createHttpLink({ uri: `http://localhost:4000/graphql` }),
  ]),
  cache: new InMemoryCache(),
})

baseStyles()
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
