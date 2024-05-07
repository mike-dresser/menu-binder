import React from 'react';
import { HiX } from 'react-icons/hi';

function Dialog({ boxState, setBoxState, title, content }) {
  return (
    <div className={boxState ? 'dialog' : 'dialog hidden'}>
      <span className="closeBtn" onClick={() => setBoxState(false)}>
        <HiX />
      </span>
      <p className="sectionHeader">{title}</p>
      <div>{content}</div>
    </div>
  );
}

export default Dialog;
