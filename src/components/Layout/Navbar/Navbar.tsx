import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import LoggedInSection from './LoggedInSection';
import LoggedOutSection from './LoggedOutSection';
import './navbar.css';

const pages = [{ name: 'My Links', link: '/u/allLinks' }];

function Navbar(): JSX.Element {
  const { isLoggedIn } = useAuth();

  return (
    <AppBar position="relative">
      <Toolbar>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
          <Typography className="shorti-title" variant="h6" component="div">
            <Link to="/">Shorti</Link>
          </Typography>
          {isLoggedIn &&
            pages.map((pageInfo) => (
              <NavLink key={pageInfo.name} to={pageInfo.link}>
                {pageInfo.name}
              </NavLink>
            ))}
        </Box>

        {isLoggedIn ? <LoggedInSection /> : <LoggedOutSection />}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
