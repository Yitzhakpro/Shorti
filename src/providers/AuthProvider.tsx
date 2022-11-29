import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context';
import { Auth } from '../services';

interface IAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

function AuthProvider(props: IAuthProviderProps): JSX.Element {
  const { children } = props;

  const { isLoading, data, isError } = useQuery({
    queryKey: ['isLoggedIn'],
    queryFn: () => Auth.isLoggedIn(),
    retry: false,
  });

  const [authInfo, setAuthInfo] = useState({ isLoggedIn: false, email: '', username: '' });

  useEffect(() => {
    if (data && !isError) {
      const { email, username } = data;
      setAuthInfo({ isLoggedIn: true, email, username });
    } else {
      setAuthInfo({ isLoggedIn: false, email: '', username: '' });
    }
  }, [data, isError]);

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    setAuthInfo({ isLoggedIn: false, email: '', username: '' });

    try {
      const registerResponse = await Auth.register(email, username, password);

      setAuthInfo({
        isLoggedIn: true,
        email: registerResponse.email,
        username: registerResponse.username,
      });

      return true;
    } catch (err) {
      setAuthInfo({ isLoggedIn: false, email: '', username: '' });

      return false;
    }
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return <AuthContext.Provider value={{ ...authInfo, register }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
