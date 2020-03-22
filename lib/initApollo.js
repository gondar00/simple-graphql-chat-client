import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

function create (initialState, { getToken }) {
  const httpLink = createHttpLink({
    uri: 'https://infinite-plateau-74257.herokuapp.com'
    // RUN LOCALLY
    // uri: 'http://localhost:4000'
    // credentials: "same-origin"
  })

  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  let link = authLink.concat(httpLink)

  if (process.browser) {
    const token = getToken()
    const wsLink = new WebSocketLink({
      uri: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://infinite-plateau-74257.herokuapp.com`,
      // RUN LOCALLY
      // uri: 'ws://localhost:4000',
      options: {
        reconnect: true,
        connectionParams: {
          Authorization: `Bearer ${token}`
        }
      }
    })

    link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      authLink.concat(httpLink)
    )
  }

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState, options) {
  if (!process.browser) {
    return create(initialState, options)
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
