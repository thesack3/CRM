import React, { useContext, useEffect, useState } from 'react';
import { LicenseInfo } from '@mui/x-license-pro';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import CallBox from './components/CallBox/index';
import { callContext } from './hooks/useCall';
import './app.css';
import { GET_TAGS } from './queries/tagQueries';
import { GET_CATEGORIES } from './queries/categoryQueries';
import { Alerts } from './components/Alerts';
import { PrivateRoutes } from './PrivateRoutes';
import DashboardAppPage from './pages/DashboardAppPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProductsPage from './pages/ProductsPage';
import LeadDetailPage from './pages/LeadDetailPage';
import ProfilePage from './pages/ProfilePage';
import NotesPage from './pages/NotesPage';
import Page404 from './pages/Page404';
import NonVerifiedPage from './pages/NonVerified';
import Website from './components/Website';
import VerifyPage from './pages/Verify';

LicenseInfo.setLicenseKey(
  '9e17734200a964cd420488accda5490fTz01ODkyOSxFPTE3MDY4NzA0MzEyMTAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
);

export default function App() {
  const { user, token } = useSelector((state) => state.auth);
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

  return (
    <>
      <ThemeProvider>
        {isCall === true ? <CallBox /> : ''}
        <ScrollToTop />
        <StyledChart />
        <Alerts />
        <Routes>
          <Route element={<PrivateRoutes token={token} user={user} />}>
            <Route path="/" element={<DashboardAppPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/leads" element={<BlogPage />} />
            <Route path="/lead/:id" element={<LeadDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tasks" element={<NotesPage />} />
          </Route>
          <Route path="/home" element={<Website />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/nonverified" element={<NonVerifiedPage />} />
          <Route path="/verifyemail/:token" element={<VerifyPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
