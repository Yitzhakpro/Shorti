import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context';
import { Auth } from '../services';

interface IAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

function AuthProvider(props: IAuthProviderProps): JSX.Element {
  const { children } = props;

  const { isLoading } = useQuery({
    queryKey: ['isLoggedIn'],
    queryFn: () => Auth.isLoggedIn(),
    retry: false,
  });

  const register = async (email: string, username: string, password: string): Promise<void> => {
    await Auth.register(email, username, password);
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: false, email: '', username: '', register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
