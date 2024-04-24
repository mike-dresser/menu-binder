import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';

function ItemFilter({
  menuName,
  setFilteredMenu,
  setIsFilteredBy,
  setShowFilterOptions,
}) {
  const [filterItems, setFilterItems] = useState({
    shellfish: false,
    nuts: false,
    sesame: false,
    pork: false,
    gluten: false,
    eggs: false,
    fish: false,
    allium: false,
    nightshade: false,
    dairy: false,
  });
  function populateFilterForm() {
    const filters = [];
    for (let item in filterItems) {
      filters.push(
        <Checkbox
          label={item}
          name={item.toLowerCase()}
          checked={filterItems[item]}
          onFilterChange={onFilterChange}
        />
      );
    }
    return filters;
  }
  function onFilterChange(label, state) {
    const currentState = { ...filterItems };
    currentState[label] = state;
    setFilterItems({ ...currentState });
  }
  async function handleSubmit() {
    const allergen_query = [];
    for (let item in filterItems) {
      if (filterItems[item]) allergen_query.push(item);
    }
    console.log(allergen_query);
    await fetch(
      `http://127.0.0.1:5555/filter?menu=${menuName}&allergens=${allergen_query}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilteredMenu(data);
        setIsFilteredBy([allergen_query]);
        setShowFilterOptions(false);
      });
  }

  return (
    <div className="filterForm">
      {populateFilterForm()}

      <button onClick={handleSubmit}>Filter</button>
    </div>
  );
}

export default ItemFilter;
