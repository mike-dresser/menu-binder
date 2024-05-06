import React from 'react';
import api from './services/api-client';

function ItemAdd({ allItems, categoryId, filteredMenu, setFilteredMenu }) {
  function onItemAdd(e) {
    const postItem = async () => {
      const response = await api.post(
        `/categories?item_id=${e.target.value}&category_id=${categoryId}`
      );
      const updatedCategories = [];
      for (let category of filteredMenu.categories) {
        if (category.id === categoryId)
          category.category_items.push({ item: response });
        updatedCategories.push(category);
      }
      setFilteredMenu({ ...filteredMenu, categories: updatedCategories });
    };
    postItem();
  }
  return (
    <select onChange={onItemAdd}>
      <option value="">Add Item...</option>
      {allItems &&
        allItems.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
    </select>
  );
}

export default ItemAdd;
