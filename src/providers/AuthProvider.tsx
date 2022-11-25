import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context';
import { Auth } from '../services';

interface IAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
function AuthProvider(props: IAuthProviderProps): JSX.Element {
  const { children } = props;

  const { isLoading } = useQuery({ queryKey: ['isLoggedIn'], queryFn: () => Auth.isLoggedIn() });

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return <AuthContext.Provider value={{ email: '', username: '' }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
