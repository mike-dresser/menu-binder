import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function ItemList({ menu: { name, categories } }) {
  const [expanded, setExpanded] = useState(false);
  function handleExpand() {
    setExpanded(!expanded);
  }
  return (
    <li>
      <div onClick={handleExpand}>
        <h2>{name}</h2>
        <span className="expandGlyph">{expanded ? '▿' : '▹'}</span>
      </div>
      {categories.map((each) => {
        return (
          <>
            <ul className={expanded ? 'expanded' : ''}>
              <li>
                <p className="sectionHeader">{each.name}</p>
              </li>
              {each.category_items.map((item) => {
                return (
                  <li className="itemLink">
                    <Link to={`./items/${item.item.id}`}>{item.item.name}</Link>
                  </li>
                );
              })}
            </ul>
          </>
        );
      })}
    </li>
  );
}

export default ItemList;
