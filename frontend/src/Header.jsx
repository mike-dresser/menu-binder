import React from 'react';
import { Link } from 'react-router-dom';
import Button from './components/Button';

function Header({ editMode, setEditMode }) {
  return (
    <div id="header">
      <h1 className="logo">
        <Link to="/">Menu Binder</Link>
      </h1>
      <Button action={() => setEditMode(!editMode)} type="outline">
        {editMode ? 'Finish Editing' : 'Edit'}
      </Button>
    </div>
  );
}

export default Header;
