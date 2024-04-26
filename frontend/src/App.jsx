import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';

function App() {
  return (
    <div id="main">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
