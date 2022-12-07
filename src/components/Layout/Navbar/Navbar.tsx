import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import LoggedInSection from './LoggedInSection';
import LoggedOutSection from './LoggedOutSection';
import './navbar.css';

function Navbar(): JSX.Element {
  const { isLoggedIn } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className="shorti-title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Shorti</Link>
        </Typography>
        {isLoggedIn ? <LoggedInSection /> : <LoggedOutSection />}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
