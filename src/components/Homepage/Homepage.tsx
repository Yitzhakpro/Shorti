import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import './homepage.css';

function Homepage(): JSX.Element {
  const { isLoggedIn, username } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = (): void => {
    navigate('/u/allLinks');
  };

  return (
    <Container className="homepage">
      <div className="homepage-intorduction">
        <Typography variant="h4">Welcome to Shorti{isLoggedIn && `, ${username}`}</Typography>
        <Typography variant="h5">You can make your links short here!</Typography>

        {isLoggedIn && (
          <Button
            className="homepage-get-started-btn"
            variant="contained"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        )}
      </div>
    </Container>
  );
}

export default Homepage;
