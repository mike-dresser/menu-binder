import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfoBox from './InfoBox';
import ItemFilter from './ItemFilter';

function ItemList({ menu }) {
  const [expanded, setExpanded] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState({});
  const [isFilteredBy, setIsFilteredBy] = useState([]);

  function handleExpand() {
    setExpanded(!expanded);
  }
  function handleShowFilter() {
    setShowFilterOptions(true);
  }
  useEffect(() => {
    setFilteredMenu(menu);
  }, []);
  let [name, categories] = [menu.name, filteredMenu.categories];
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
          title={'Remove Items Including'}
          content={
            <ItemFilter
              menuName={name}
              setFilteredMenu={setFilteredMenu}
              setIsFilteredBy={setIsFilteredBy}
              setShowFilterOptions={setShowFilterOptions}
            />
          }
        />
      )}
      {expanded && <button onClick={handleShowFilter}>Filter...</button>}
      {categories &&
        categories.map((each) => {
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
