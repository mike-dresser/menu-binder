import React from 'react';

function Button({ action, type = 'text', children }) {
  return (
    <button onClick={action} className={type}>
      {children}
    </button>
  );
}

export default Button;
