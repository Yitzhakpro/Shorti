import { createContext } from 'react';

interface IAuthContext {
  username: string;
  email: string;
}

const defaultAuthContext: IAuthContext = {
  username: 'anonymous',
  email: 'anonymous@anon.com',
};

const AuthContext = createContext(defaultAuthContext);

export default AuthContext;
