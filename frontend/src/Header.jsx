import React from 'react';
import { Link } from 'react-router-dom';

function Header({ editMode, setEditMode }) {
  return (
    <div id="header">
      <h1 className="logo">
        <Link to="/">Menu Binder</Link>
      </h1>
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? 'Finish Editing' : 'Edit'}
      </button>
    </div>
  );
}

export default Header;
