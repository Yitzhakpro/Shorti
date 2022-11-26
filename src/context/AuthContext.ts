import { createContext } from 'react';

export interface IAuthContext {
  isLoggedIn: boolean;
  username: string;
  email: string;
}

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  username: 'anonymous',
  email: 'anonymous@anon.com',
};

const AuthContext = createContext(defaultAuthContext);

export default AuthContext;
