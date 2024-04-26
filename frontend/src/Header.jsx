import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div id="header">
      <h1 className="logo">
        <Link to="/">Menu Binder</Link>
      </h1>
    </div>
  );
}

export default Header;
