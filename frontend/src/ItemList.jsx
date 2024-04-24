import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import InfoBox from './InfoBox';
import ItemFilter from './ItemFilter';

function ItemList({ menu: { name, categories } }) {
  const [expanded, setExpanded] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  function handleExpand() {
    setExpanded(!expanded);
  }
  function handleShowFilter() {
    setShowFilterOptions(true);
  }
  return (
    <li key={name}>
      <div onClick={handleExpand}>
        <h2>{name}</h2>
        <span className="expandGlyph">{expanded ? '▿' : '▹'}</span>
      </div>
      {showFilterOptions && (
        <InfoBox
          boxState={showFilterOptions}
          setBoxState={setShowFilterOptions}
          title={'Filter By'}
          content={<ItemFilter />}
        />
      )}
      {expanded && <button onClick={handleShowFilter}>Filter...</button>}
      {categories.map((each) => {
        return (
          <ul
            key={`${name}${each.name}`}
            className={expanded ? 'expanded' : ''}
          >
            <li key={`${name}${each.name}`}>
              <p className="sectionHeader">{each.name}</p>
            </li>
            {each.category_items.map((item) => {
              return (
                <li key={`${name}${item.item.name}`} className="itemLink">
                  <Link to={`./items/${item.item.id}`}>{item.item.name}</Link>
                </li>
              );
            })}
          </ul>
        );
      })}
    </li>
  );
}

export default ItemList;
