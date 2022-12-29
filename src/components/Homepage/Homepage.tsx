import React from 'react';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../../hooks';
import './homepage.css';

function Homepage(): JSX.Element {
  const { isLoggedIn, username } = useAuth();

  return (
    <Container className="homepage">
      <div className="homepage-intorduction">
        <Typography variant="h4">Welcome to Shorti{isLoggedIn && `, ${username}`}</Typography>
        <Typography variant="h5">You can make your links short here!</Typography>
      </div>
    </Container>
  );
}

export default Homepage;
