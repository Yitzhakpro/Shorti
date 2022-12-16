import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound(): JSX.Element {
  const navigate = useNavigate();

  const handleReturnToHomepage = (): void => {
    navigate('/');
  };

  return (
    <div>
      <Typography>Oops, Looks like what you&apos;ve searched for does not exist!</Typography>
      <Button onClick={handleReturnToHomepage}>Click here to get to the homepage</Button>
    </div>
  );
}

export default NotFound;
