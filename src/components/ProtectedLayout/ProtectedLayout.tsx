import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

function ProtectedLayout(): JSX.Element {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/u/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
