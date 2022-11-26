/* eslint-disable autofix/no-unused-vars */
import { createContext } from 'react';

export interface IAuthContext {
  isLoggedIn: boolean;
  username: string;
  email: string;
  register: (email: string, username: string, password: string) => Promise<void>;
}

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  username: 'anonymous',
  email: 'anonymous@anon.com',
  register: () => {
    return Promise.resolve();
  },
};

const AuthContext = createContext(defaultAuthContext);

export default AuthContext;
