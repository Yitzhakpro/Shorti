import React, { useState, useEffect } from 'react';
import { AuthContext } from '../context';
import { Auth } from '../services';

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
        const { email, username } = res;
        setAuthInfo({ isLoggedIn: true, email, username });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setAuthInfo({ isLoggedIn: false, email: '', username: '' });
        setIsError({ isError: true, error: err });
        setIsLoading(false);
      });
  }, []);

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

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthInfo({ isLoggedIn: false, email: '', username: '' });

    try {
      const loginResponse = await Auth.login(email, password);

      setAuthInfo({
        isLoggedIn: true,
        email: loginResponse.email,
        username: loginResponse.username,
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

  return (
    <AuthContext.Provider value={{ ...authInfo, register, login }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
