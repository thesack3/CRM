import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
// import VerifyPage from './pages/VerifyEmail';
import VerifyPage from './pages/Verify/index';
import NonVerifiedPage from './pages/NonVerified';
import ProfilePage from './pages/ProfilePage';
import Website from './components/Website/index';
import HomeList from './components/HomeList';
import LeadDetailPage from './pages/LeadDetailPage';
import NotesPage from './pages/NotesPage';
import SignUpPage from './pages/SignUpPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'leads', element: <BlogPage /> },
        { path: 'lead/:id', element: <LeadDetailPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'tasks', element: <NotesPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      path: 'verifyemail/:token',
      element: <VerifyPage />,
      // element: <NonVerifiedPage />,
    },
    {
      path: 'home',
      element: <Website />,
      // element: <NonVerifiedPage />,
    },
    {
      path: 'listings',
      element: <HomeList />,
      // element: <NonVerifiedPage />,
    },
    {
      path: 'nonverified',
      element: <NonVerifiedPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
