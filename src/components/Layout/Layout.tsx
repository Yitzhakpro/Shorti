import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <div>
      <h1>Layout here</h1>
      <Outlet />
    </div>
  );
}

export default Layout;
