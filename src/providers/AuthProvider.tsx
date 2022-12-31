import React, { useState, useEffect } from 'react';
import { AuthContext } from '../context';
import { Auth } from '../services';
import { notifyLoading, updateNotify } from '../utils';

interface IAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

function AuthProvider(props: IAuthProviderProps): JSX.Element {
  const { children } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [authInfo, setAuthInfo] = useState({ isLoggedIn: false, email: '', username: '' });
  const [_isError, setIsError] = useState({ isError: false, error: '' });

  useEffect(() => {
    setIsLoading(true);

    Auth.isLoggedIn()
      .then((res) => {
        if (res) {
          const { email, username } = res;
          setAuthInfo({ isLoggedIn: true, email, username });
          setIsLoading(false);
        } else {
          setAuthInfo({ isLoggedIn: false, email: '', username: '' });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setAuthInfo({ isLoggedIn: false, email: '', username: '' });
        setIsError({ isError: true, error: err });
        setIsLoading(false);
      });
  }, []);

  const logout = async (): Promise<boolean> => {
    try {
      await Auth.logout();

      setAuthInfo({
        isLoggedIn: false,
        email: '',
        username: '',
      });

      return true;
    } catch (err) {
      setAuthInfo({
        isLoggedIn: false,
        email: '',
        username: '',
      });

      return false;
    }
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    setAuthInfo({ isLoggedIn: false, email: '', username: '' });

    const loadingId = notifyLoading('Creating a user for you...');
    try {
      const registerResponse = await Auth.register(email, username, password);

      setAuthInfo({
        isLoggedIn: true,
        email: registerResponse.email,
        username: registerResponse.username,
      });
      updateNotify(loadingId, 'Registered successfully.', 'success');

      return true;
    } catch (error: any) {
      setAuthInfo({ isLoggedIn: false, email: '', username: '' });
      updateNotify(loadingId, error.message, 'error');

      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthInfo({ isLoggedIn: false, email: '', username: '' });

    const loadingId = notifyLoading('Checking your account...');
    try {
      const loginResponse = await Auth.login(email, password);

      setAuthInfo({
        isLoggedIn: true,
        email: loginResponse.email,
        username: loginResponse.username,
      });
      updateNotify(loadingId, 'Logged in successfully.', 'success');

      return true;
    } catch (error: any) {
      setAuthInfo({ isLoggedIn: false, email: '', username: '' });
      updateNotify(loadingId, error.message, 'error');

      return false;
    }
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <AuthContext.Provider value={{ ...authInfo, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
