import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(_existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  }),
});
