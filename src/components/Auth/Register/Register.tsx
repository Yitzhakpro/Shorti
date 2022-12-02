import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { register } = useAuth();

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

  return (
    <form onSubmit={handleRegister}>
      <span>Username:</span>
      <input type="text" name="username" value={registerInfo.username} onChange={handleChange} />

      <span>Email:</span>
      <input type="email" name="email" value={registerInfo.email} onChange={handleChange} />

      <span>Password:</span>
      <input
        type="password"
        name="password"
        value={registerInfo.password}
        onChange={handleChange}
      />

      <span>Repeat Password:</span>
      <input
        type="password"
        name="confirmPassword"
        value={registerInfo.confirmPassword}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
