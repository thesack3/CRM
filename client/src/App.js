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


const VALIDATE_JWT_QUERY = gql`
  query ValidateJwt {
    validateJwt
  }
`;


LicenseInfo.setLicenseKey('9e17734200a964cd420488accda5490fTz01ODkyOSxFPTE3MDY4NzA0MzEyMTAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');


export default function App() {

 

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


  return (<><ApolloProvider client={client}>


  <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
</ApolloProvider>

</>
    
  
  );
}
