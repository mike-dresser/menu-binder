import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dialog from './components/Dialog';
import ItemFilter from './ItemFilter';
import { EditModeContext } from './App';
import api from './services/api-client';
import Button from './components/Button';
import ItemAdd from './ItemAdd';
import { HiChevronRight, HiChevronDown, HiX } from 'react-icons/hi';

function ItemList({ menu, allItems }) {
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
  function handleItemCategoryDelete(itemId, catId) {
    async function fetchDelete() {
      await api.delete(`/categories?item_id=${itemId}&category_id=${catId}`);
      console.log(menu);
    }
    fetchDelete();
    function updateMenu(itemId, catId) {
      const updated = { categories: [] };
      for (let category of filteredMenu.categories) {
        const updatedCategoryItems = category.category_items.filter((each) => {
          return (
            each.item.id !== itemId ||
            (each.item.id === itemId && category.id !== catId)
          );
        });
        updated.categories.push({
          ...category,
          category_items: updatedCategoryItems,
        });
      }
      setFilteredMenu(updated);
    }
    updateMenu(itemId, catId);
  }
  useEffect(() => {
    setFilteredMenu(menu);
  }, []);
  let [name, categories] = [menu.name, filteredMenu.categories];
  return (
    <li key={menu.id}>
      <div key={`${name}Div`} onClick={handleExpand}>
        <h2>{name}</h2>
        <span className="expandIcon">
          {/* <IconContext.Provider value={{ size: '2em' }}> */}
          {expanded ? <HiChevronDown /> : <HiChevronRight />}
          {/* </IconContext.Provider> */}
        </span>
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
            <h4 className="sectionHeader">Filtered By</h4>
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
              <Button action={handleClearFilter} type="outline closeIcon">
                Clear <HiX />
              </Button>
            </div>
          </>
        ) : (
          !editMode && (
            <Button action={handleShowFilter} type="outline">
              Filter...
            </Button>
          )
        ))}
      {categories &&
        categories.map((each) => {
          return (
            <ul className={expanded ? 'expanded' : ''}>
              <li key={each.id}>
                <h3 className="sectionHeader">{each.name}</h3>
              </li>
              <li key={`${each.id}Add`}>
                {editMode && (
                  <ItemAdd
                    allItems={allItems}
                    categoryId={each.id}
                    filteredMenu={filteredMenu}
                    setFilteredMenu={setFilteredMenu}
                  />
                )}
              </li>
              {each.category_items.map((item) => {
                return (
                  <li key={`${name}${item.item.id}`} className="itemLink">
                    <Link to={`./items/${item.item.id}`}>{item.item.name}</Link>
                    {editMode && (
                      <Button
                        action={() =>
                          handleItemCategoryDelete(item.item.id, each.id)
                        }
                        type="closeIcon"
                      >
                        <HiX />
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
