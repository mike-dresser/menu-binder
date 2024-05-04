import React from 'react';

function Button({ action, type = 'outline', children }) {
  return (
    <button onClick={action} className={type}>
      {children}
    </button>
  );
}

export default Button;
