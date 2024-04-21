import React, { useRef, useState } from 'react';

function ItemList({ name, items }) {
  const [expanded, setExpanded] = useState(false);
  function handleExpand() {
    setExpanded(!expanded);
  }
  return (
    <>
      <div>
        <h2 onClick={handleExpand}>{name}</h2>
        <span className="expandGlyph">{expanded ? '▿' : '▹'}</span>
      </div>
      <ul className={expanded ? 'expanded' : ''}>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemList;
