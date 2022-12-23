import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout(): JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
