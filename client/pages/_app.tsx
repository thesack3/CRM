import '@/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {ApolloClient , ApolloProvider, InMemoryCache } from '@apollo/client'
import LoginPage from '../components/LoginPage'

import type { AppProps } from 'next/app'

//Create a login conditional to check if the user is logged in or not 


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




export default function App({ Component, pageProps }: AppProps) {
  
  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth(){
      const token = localStorage.getItem('token');
      if(token){
        setLoggedIn(true);
      }else{
        setLoggedIn(false);
      }
    }
  
    return () => {
      
    }
  }, [])
  




  return (
  <>
   <ApolloProvider client={client}>

    {loggedIn ? <Component {...pageProps} /> : <LoginPage />}



  </ApolloProvider>
  
  </>  )
  
  
}
