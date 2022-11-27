import React, { useState } from 'react';
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

  const [authInfo, setAuthInfo] = useState({ isLoggedIn: false, email: '', username: '' });

  const register = async (email: string, username: string, password: string): Promise<void> => {
    setAuthInfo({ isLoggedIn: false, email: '', username: '' });

    try {
      const registerResponse = await Auth.register(email, username, password);

      setAuthInfo({
        isLoggedIn: true,
        email: registerResponse.email,
        username: registerResponse.username,
      });
    } catch (err) {
      setAuthInfo({ isLoggedIn: false, email: '', username: '' });
    }
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return <AuthContext.Provider value={{ ...authInfo, register }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
