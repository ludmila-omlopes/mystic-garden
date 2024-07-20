// apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const ENDPOINT = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? 'https://api-v2.lens.dev' : 'https://api-v2-amoy.lens.dev';

const client = new ApolloClient({
    uri: ENDPOINT,
    cache: new InMemoryCache()
});

export default client;
