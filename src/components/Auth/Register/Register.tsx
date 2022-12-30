import React, { useState } from 'react';
import { Container, Button, Paper, TextField } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { validateRegisterForm } from './utils';
import type { RegisterValidationErrors } from './types';
import './register.css';

const createMultiLineJSX = (strings: string[]): JSX.Element => {
  return (
    <>
      {strings.map((string, index) => {
        if (index < strings.length - 1) {
          return (
            <div key={index}>
              <span>{string}</span>
              <br />
            </div>
          );
        }

        return <span key={index}>{string}</span>;
      })}
    </>
  );
};

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { isLoggedIn, register } = useAuth();

  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [registerErrors, setRegisterErrors] = useState<RegisterValidationErrors>({
    username: [],
    email: [],
    password: [],
    confirmPassword: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterInfo({ ...registerInfo, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setRegisterErrors({
      username: [],
      email: [],
      password: [],
      confirmPassword: [],
    });

    const { email, username, password, confirmPassword } = registerInfo;
    const registerFormValidations = validateRegisterForm(
      username,
      email,
      password,
      confirmPassword
    );
    if (Object.keys(registerFormValidations).length > 0) {
      setRegisterErrors(registerFormValidations as RegisterValidationErrors);
      return;
    }

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
            error={registerErrors.username.length > 0}
            helperText={
              registerErrors.username.length > 0 && createMultiLineJSX(registerErrors.username)
            }
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
            error={registerErrors.email.length > 0}
            helperText={registerErrors.email.length > 0 && createMultiLineJSX(registerErrors.email)}
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
            error={registerErrors.password.length > 0}
            helperText={
              registerErrors.password.length > 0 && createMultiLineJSX(registerErrors.password)
            }
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
            error={registerErrors.confirmPassword.length > 0}
            helperText={
              registerErrors.confirmPassword.length > 0 &&
              createMultiLineJSX(registerErrors.confirmPassword)
            }
            value={registerInfo.confirmPassword}
            onChange={handleChange}
          />

          <Button className="register-btn" type="submit" variant="contained">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
