import React, { useEffect, useState } from 'react';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import api from './services/api-client';
import capitalize from './services/capitalize';

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
          key={item}
          label={capitalize(item)}
          name={item}
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
    const result = await api.get(
      `/filter?menu=${menuName}&allergens=${allergen_query}`
    );
    setFilteredMenu(result);
    setIsFilteredBy([allergen_query]);
    setShowFilterOptions(false);
    setIsFilteredBy(allergen_query);
  }

  return (
    <div className="filterForm">
      {populateFilterForm()}

      <Button action={handleSubmit}>Filter</Button>
    </div>
  );
}

export default ItemFilter;
