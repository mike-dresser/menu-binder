import React from 'react';

function InfoBox({ boxState, setBoxState, title, content }) {
  return (
    <div className={boxState ? 'infoBox' : 'infoBox hidden'}>
      <span className="closeBtn" onClick={() => setBoxState(false)}>
        ✖️
      </span>
      <p className="sectionHeader">{title}</p>
      <p>{content}</p>
    </div>
  );
}

export default InfoBox;
