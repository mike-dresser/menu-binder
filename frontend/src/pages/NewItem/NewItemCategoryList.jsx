import React, { useEffect, useState } from 'react';
import api from '../../services/api-client';
import { HiX } from 'react-icons/hi';

let categoryDict = {};
function NewItemCategoryList({ newItem, setNewItem }) {
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await api.get('/categories');
      setAllCategories(categories);
      createCategoryDict(categories);
    };
    fetchCategories();
  }, []);

  function createCategoryDict(data) {
    for (let category of data) {
      categoryDict[category.category_id] = {
        menu: { name: category.menu, id: category.menu_id },
        category: { name: category.name, id: category.category_id },
      };
    }
  }

  function onListChange(e) {
    // Add selected category to newItem
    const itemCategories = [...newItem.categories];
    itemCategories.push(categoryDict[e.target.value]);
    setNewItem({ ...newItem, categories: itemCategories });
    e.target.value = '';
  }

  function deleteCategory(id) {
    const filtered = newItem.categories.filter(
      (category) => category.category.id != id
    );
    setNewItem({ ...newItem, categories: filtered });
  }
  {
    console.log('newItem', newItem);
  }
  return (
    <>
      <ul>
        {newItem.categories &&
          newItem.categories.map(({ category, menu }) => {
            return (
              <li key={category.id} className="newCategory">
                {/* {categoryDict[category.id].menu.name} */}
                {menu.name}
                <span onClick={() => deleteCategory(category.id)}>
                  <HiX />
                </span>
              </li>
            );
          })}
      </ul>
      <select onChange={onListChange}>
        <option key="0" value="">
          Select menu category
        </option>

        {allCategories &&
          allCategories.map((category) => {
            return (
              <option key={category.category_id} value={category.category_id}>
                {category.menu} {category.name && ` - ${category.name}`}
              </option>
            );
          })}
      </select>
    </>
  );
}

export default NewItemCategoryList;
