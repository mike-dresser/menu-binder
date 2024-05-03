import React from 'react';

function Checkbox({ label, name, checked = false, onFilterChange }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onFilterChange(name, e.target.checked)}
      ></input>
    </div>
  );
}

export default Checkbox;
