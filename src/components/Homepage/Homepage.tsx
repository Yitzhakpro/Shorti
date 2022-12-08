import React from 'react';
import { Container, Typography } from '@mui/material';
import './homepage.css';

function Homepage(): JSX.Element {
  return (
    <Container className="homepage">
      <div className="homepage-intorduction">
        <Typography variant="h4">Welcome to Shorti</Typography>
        <Typography variant="h5">You can make your links short here!</Typography>
      </div>
    </Container>
  );
}

export default Homepage;
