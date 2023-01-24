import '@/styles/globals.css'
import {ApolloClient , ApolloProvider, InMemoryCache } from '@apollo/client'


const cache = new InMemoryCache({
  typePolicies:{
    Query:{
      fields:{
        clients:{
          merge(existing, incoming){
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})




import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
   <ApolloProvider client={client}>
     <Component {...pageProps} />
  </ApolloProvider>
  
  </>  )
  
  
}
