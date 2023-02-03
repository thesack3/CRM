// routes
import { LicenseInfo } from '@mui/x-license-pro';
import { InMemoryCache, ApolloClient, ApolloProvider, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';


import Router from './routes';
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';


LicenseInfo.setLicenseKey(process.env.MUIX_API_KEY );





const VALIDATE_JWT_QUERY = gql`
  query ValidateJwt {
    validateJwt
  }
`;
// ----------
//------------------------------------------------------------

export default function App() {

  // const { loading, error, data } = useQuery(VALIDATE_JWT_QUERY, {
  //   context: {
  //     headers: {
  //       authorization: localStorage.getItem('jwt'),
  //     },
  //   },
  // });

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      //   setToken(jwt);
    }

  
    return () => {
      
    }
  }, [])
  


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
          },
          leads: {
            merge(existing, incoming){
              return incoming;
            },
          },
          users: {
            merge(existing, incoming){
              return incoming;
            },
          }
        }
      }
    }
  });
  
  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache,
  })

  return (


<>

     <ApolloProvider client={client}>


  <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
</ApolloProvider>

</>
    
  
  );
}
