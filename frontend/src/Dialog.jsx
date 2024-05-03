import React from 'react';

function Dialog({ boxState, setBoxState, title, content }) {
  return (
    <div className={boxState ? 'dialog' : 'dialog hidden'}>
      <span className="closeBtn" onClick={() => setBoxState(false)}>
        ✖️
      </span>
      <p className="sectionHeader">{title}</p>
      <div>{content}</div>
    </div>
  );
}

export default Dialog;
