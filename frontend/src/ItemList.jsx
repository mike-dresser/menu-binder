import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dialog from './Dialog';
import ItemFilter from './ItemFilter';
import { EditModeContext } from './App';
import api from './services/api-client';
import Button from './components/Button';

function ItemList({ menu }) {
  const [expanded, setExpanded] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState({});
  const [isFilteredBy, setIsFilteredBy] = useState([]);
  const editMode = useContext(EditModeContext);

  function handleExpand() {
    setExpanded(!expanded);
  }
  function handleShowFilter() {
    setShowFilterOptions(true);
  }
  function handleClearFilter() {
    setFilteredMenu(menu);
    setIsFilteredBy([]);
  }
  function handleItemDelete(id) {
    async function fetchDelete() {
      const result = await api.delete(`/items/${id}`);
      return result;
    }
    fetchDelete();
    function updateMenu() {
      const updated = { categories: [] };
      for (let category of filteredMenu.categories) {
        const updatedCategoryItems = category.category_items.filter((each) => {
          return each.item.id !== id;
        });
        updated.categories.push({
          ...category,
          category_items: updatedCategoryItems,
        });
      }
      setFilteredMenu(updated);
    }
    updateMenu();
  }
  useEffect(() => {
    setFilteredMenu(menu);
  }, []);
  let [name, categories] = [menu.name, filteredMenu.categories];
  return (
    <li key={`${name}Item`}>
      <div key={`${name}Div`} onClick={handleExpand}>
        <h2>{name}</h2>
        <span className="expandGlyph">{expanded ? '▿' : '▹'}</span>
      </div>
      {showFilterOptions && (
        <Dialog
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
      {expanded &&
        (isFilteredBy.length ? (
          <>
            <p className="sectionHeader">Filtered By</p>
            <div className="filteredByContainer">
              <div>
                {isFilteredBy.map((allergen) => {
                  return (
                    <div key={allergen} className="filteredByBadge">
                      {allergen}
                    </div>
                  );
                })}
              </div>
              <button onClick={handleClearFilter}>Clear ✖️</button>
            </div>
          </>
        ) : (
          <button onClick={handleShowFilter}>Filter...</button>
        ))}
      {categories &&
        categories.map((each) => {
          return (
            <ul className={expanded ? 'expanded' : ''}>
              <li key={`${name}${each.name}`}>
                <p className="sectionHeader">{each.name}</p>
              </li>
              {each.category_items.map((item) => {
                return (
                  <li key={`${name}${item.item.id}`} className="itemLink">
                    <Link to={`./items/${item.item.id}`}>{item.item.name}</Link>
                    {editMode && (
                      <Button action={() => handleItemDelete(item.item.id)}>
                        ✖
                      </Button>
                    )}
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
