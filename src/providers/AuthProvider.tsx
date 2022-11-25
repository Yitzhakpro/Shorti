import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { Auth } from '../services';

interface IAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

function AuthProvider(props: IAuthProviderProps): JSX.Element {
  const { children } = props;
  const { isLoading, isError } = useQuery({ queryKey: ['isLoggedIn'], queryFn: Auth.isLoggedIn });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to="/u/login" />;
  }

  return <>{children}</>;
}

export default AuthProvider;
