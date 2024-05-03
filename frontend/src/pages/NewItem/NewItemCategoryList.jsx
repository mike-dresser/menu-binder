import React, { useEffect, useState } from 'react';

let categoryDict = {};
function NewItemCategoryList({ newItem, setNewItem }) {
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/categories`)
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
        createCategoryDict(data);
      });
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
  return (
    <>
      {newItem.categories.length > 0 && (
        <ul>
          {newItem.categories.map((category) => {
            return (
              <li key={category.category.id} className="newCategory">
                {categoryDict[category.category.id].menu.name}
                <span onClick={() => deleteCategory(category.category.id)}>
                  ✖️
                </span>
              </li>
            );
          })}
        </ul>
      )}
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
