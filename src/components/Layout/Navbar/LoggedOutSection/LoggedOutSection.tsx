import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './loggedOutSection.css';

function LoggedOutSection(): JSX.Element {
  return (
    <div className="logged-out-section">
      <div className="auth-btns-section">
        <Button className="auth-btn">
          <Link to="/u/login">Login</Link>
        </Button>
        <Button className="auth-btn">
          <Link to="/u/register">Register</Link>
        </Button>
      </div>
    </div>
  );
}

export default LoggedOutSection;
