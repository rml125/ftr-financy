import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
});

const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem('financy_token');
  return {
    headers: {
      ...prevContext['headers'],
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
