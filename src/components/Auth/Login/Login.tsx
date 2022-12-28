import React, { useState } from 'react';
import { Container, Button, Paper, TextField } from '@mui/material';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import './login.css';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, login } = useAuth();

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
      const gotFromUrl = state && state.from ? state.from.pathname ?? '/' : '/';

      navigate(gotFromUrl, { replace: true });
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container maxWidth="sm">
      <Paper className="login-form-container" elevation={3}>
        <form className="login-form" onSubmit={handleLogin}>
          <TextField
            type="email"
            name="email"
            label="Email Address"
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            required
            value={loginInfo.email}
            onChange={handleChange}
          />

          <TextField
            type="password"
            name="password"
            label="Password"
            margin="dense"
            fullWidth
            variant="standard"
            required
            value={loginInfo.password}
            onChange={handleChange}
          />

          <Button type="submit">Login</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
