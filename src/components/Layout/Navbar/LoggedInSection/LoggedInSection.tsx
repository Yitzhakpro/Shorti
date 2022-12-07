import React from 'react';
import { Typography, Button } from '@mui/material';
import { useAuth } from '../../../../hooks';
import './loggedInSection.css';

function LoggedInSection(): JSX.Element {
  const { username } = useAuth();

  return (
    <div className="logged-in-section">
      <Typography>Welcome, {username}</Typography>
      <Button className="logout-btn">Logout</Button>
    </div>
  );
}

export default LoggedInSection;
