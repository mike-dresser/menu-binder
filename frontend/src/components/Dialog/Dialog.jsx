import React from 'react';
import { HiX } from 'react-icons/hi';
import Button from '../Button';

function Dialog({ boxState, setBoxState, title, content }) {
  return (
    <div className={boxState ? 'dialog' : 'dialog hidden'}>
      <Button type="closeBtn" action={() => setBoxState(false)}>
        <HiX />
      </Button>
      <p className="sectionHeader">{title}</p>
      <div>{content}</div>
    </div>
  );
}

export default Dialog;
