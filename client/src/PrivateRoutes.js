import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';

export const PrivateRoutes = ({ token, user }) => {
  return token && user?.emailVerified ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  );
};
