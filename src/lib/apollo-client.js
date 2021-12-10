import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

console.log('REACT_APP_APOLLO_GRAPHQL_URI', process.env.REACT_APP_APOLLO_GRAPHQL_URI);
// Create an http link:
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_APOLLO_SUBSCRIPTION_URI,
  options: {
    reconnect: true,
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

const setHeaders = (operation) => operation.setContext({ headers: { authorization: localStorage.getItem('token') } });

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  request: setHeaders,
});

const initialState = {
  token: '',
};

cache.writeData({ data: initialState });

client.onResetStore(() => cache.writeData({ data: initialState }));

export default client;
