import React, { useState } from 'react';
import { Container, Button, Paper, TextField } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import './register.css';

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { isLoggedIn, register } = useAuth();

  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const { email, username, password } = registerInfo;
    const success = await register(email, username, password);

    if (success) {
      navigate('/');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container maxWidth="sm">
      <Paper className="register-form-container" elevation={3}>
        <form className="register-form" onSubmit={handleRegister}>
          <TextField
            type="text"
            name="username"
            label="Username"
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            required
            value={registerInfo.username}
            onChange={handleChange}
          />

          <TextField
            type="email"
            name="email"
            label="Email Address"
            margin="dense"
            fullWidth
            variant="standard"
            required
            value={registerInfo.email}
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
            value={registerInfo.password}
            onChange={handleChange}
          />

          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            margin="dense"
            fullWidth
            variant="standard"
            required
            value={registerInfo.confirmPassword}
            onChange={handleChange}
          />

          <Button type="submit">Register</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
