/* eslint-disable autofix/no-unused-vars */
import { createContext } from 'react';

export interface IAuthContext {
  isLoggedIn: boolean;
  username: string;
  email: string;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
}

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  username: 'anonymous',
  email: 'anonymous@anon.com',
  register: () => {
    return Promise.resolve(true);
  },
  login: () => {
    return Promise.resolve(true);
  },
};

const AuthContext = createContext(defaultAuthContext);

export default AuthContext;
