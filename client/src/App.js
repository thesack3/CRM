import React, { useContext, useEffect, useState } from 'react';
// routes

import { LicenseInfo } from '@mui/x-license-pro';
import { useQuery } from '@apollo/client';

import gql from 'graphql-tag';

import Router from './routes';
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import CallBox from './components/CallBox/index';
import { callContext } from './hooks/useCall';
import './app.css';
import { GET_TAGS } from './queries/tagQueries';
import { GET_CATEGORIES } from './queries/categoryQueries';

const VALIDATE_JWT_QUERY = gql`
  query ValidateJwt {
    validateJwt
  }
`;

LicenseInfo.setLicenseKey(
  '9e17734200a964cd420488accda5490fTz01ODkyOSxFPTE3MDY4NzA0MzEyMTAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
);

export default function App() {
  const { isCall, setCategories, setTags, refetch: reload } = useContext(callContext);
  const { data: categoriesData, refetch: categoriesRefetch } = useQuery(GET_CATEGORIES);
  const { data: tagData, refetch: tagsRefetch } = useQuery(GET_TAGS);

  useEffect(() => {
    (async () => {
      setCategories(categoriesData);
      setTags(tagData);
    })();
  }, [categoriesData, tagData]);

  useEffect(() => {
    if (reload) {
      (async () => {
        await categoriesRefetch();
        await tagsRefetch();
      })();
    }
  }, [reload]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      //   setToken(jwt);
    }
    return () => {};
  }, []);

  return (
    <>
      <ThemeProvider>
        {isCall === true ? <CallBox /> : ''}
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </>
  );
}
