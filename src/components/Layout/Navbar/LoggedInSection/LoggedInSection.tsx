import React from 'react';
import { Typography, Button } from '@mui/material';
import { useAuth } from '../../../../hooks';
import './loggedInSection.css';

function LoggedInSection(): JSX.Element {
  const { username, logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <div className="logged-in-section">
      <Typography>Welcome, {username}</Typography>
      <Button className="logout-btn" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default LoggedInSection;
