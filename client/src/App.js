import React, { useContext, useEffect, useState } from 'react';
// routes

import { LicenseInfo } from '@mui/x-license-pro';
import { InMemoryCache, ApolloClient, ApolloProvider, useQuery } from '@apollo/client';

import gql from 'graphql-tag';

import Router from './routes';
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import CallBox from './components/CallBox/index';
import { callContext } from './hooks/useCall';
import './app.css';

const VALIDATE_JWT_QUERY = gql`
  query ValidateJwt {
    validateJwt
  }
`;

LicenseInfo.setLicenseKey(
  '9e17734200a964cd420488accda5490fTz01ODkyOSxFPTE3MDY4NzA0MzEyMTAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
);

export default function App() {
  const { isCall, userName } = useContext(callContext);
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      //   setToken(jwt);
    }

    return () => {};
  }, []);

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          leads: {
            merge(existing, incoming) {
              return incoming;
            },
          },
          users: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache,
  });
  console.log('iscal---------', isCall, typeof isCall, userName, typeof userName);
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider>
          {isCall === true ? <CallBox /> : ''}
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
