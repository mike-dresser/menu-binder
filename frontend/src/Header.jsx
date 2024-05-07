import React from 'react';
import { Link } from 'react-router-dom';
import Button from './components/Button';
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi';

function Header({ editMode, setEditMode }) {
  return (
    <div id="header">
      <h1 className="logo">
        <Link to="/">Menu Binder</Link>
      </h1>
      <Button action={() => setEditMode(!editMode)} type="outline">
        {editMode ? (
          <span className="icon">
            Finish Editing <HiOutlineLockOpen />
          </span>
        ) : (
          <span className="icon">
            Edit <HiOutlineLockClosed />
          </span>
        )}
      </Button>
    </div>
  );
}

export default Header;
