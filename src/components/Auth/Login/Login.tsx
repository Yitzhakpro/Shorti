import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const { email, password } = loginInfo;
    const success = await login(email, password);

    if (success) {
      const { state } = location;
      const gotFromUrl = state.from ? state.from.pathname ?? '/' : '/';

      navigate(gotFromUrl, { replace: true });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <span>Email:</span>
      <input type="email" name="email" value={loginInfo.email} onChange={handleChange} />

      <span>Password:</span>
      <input type="password" name="password" value={loginInfo.password} onChange={handleChange} />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
