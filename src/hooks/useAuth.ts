import { useContext } from 'react';
import { AuthContext } from '../context';
import type { IAuthContext } from '../context';

function useAuth(): IAuthContext {
  return useContext(AuthContext);
}

export default useAuth;
