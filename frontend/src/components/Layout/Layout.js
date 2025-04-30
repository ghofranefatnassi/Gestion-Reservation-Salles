import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 280, padding: '0rem', width: '100%' ,marginTop:60}}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;