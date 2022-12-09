import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import LoggedInSection from './LoggedInSection';
import LoggedOutSection from './LoggedOutSection';
import './navbar.css';

const pages = [
  { name: 'My Links', link: '/u/allLinks' },
  { name: 'Create Links', link: '/u/createLinks' },
];

function Navbar(): JSX.Element {
  const { isLoggedIn } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className="shorti-title" variant="h6" component="div">
          <Link to="/">Shorti</Link>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
          {pages.map((pageInfo) => (
            <Link key={pageInfo.name} to={pageInfo.link}>
              {pageInfo.name}
            </Link>
          ))}
        </Box>

        {isLoggedIn ? <LoggedInSection /> : <LoggedOutSection />}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
