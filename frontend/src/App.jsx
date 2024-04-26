import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  return (
    <>
      <div id="header">
        <h1 className="logo">Menu Binder</h1>
      </div>
      <Outlet />
    </>
  );
}

export default App;
