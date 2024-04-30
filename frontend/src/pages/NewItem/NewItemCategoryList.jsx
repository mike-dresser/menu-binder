import React, { useEffect, useState } from 'react';

let menuDict = {};
function NewItemCategoryList({ newItem, setNewItem }) {
  const [allMenus, setAllMenus] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/menus`)
      .then((res) => res.json())
      .then((data) => {
        setAllMenus(data);
        createMenuDict(data);
      });
  }, []);

  function createMenuDict(menuData) {
    for (let menu of menuData) {
      for (let category of menu.categories) {
        menuDict[category.id] = `${menu.name} - ${category.name || menu.name}`;
      }
    }
  }
  function onListChange(e) {
    // Add selected category to newItem
    const itemCategories = [...newItem.menuCategories];
    itemCategories.push(e.target.value);
    setNewItem({ ...newItem, menuCategories: itemCategories });
    e.target.value = '';
  }

  function deleteCategory(id) {
    const filtered = newItem.menuCategories.filter(
      (categoryId) => categoryId != id
    );
    setNewItem({ ...newItem, menuCategories: filtered });
  }
  return (
    <>
      {newItem.menuCategories.length > 0 && (
        <ul>
          {newItem.menuCategories.map((categoryId) => {
            return (
              <li className="newCategory">
                {menuDict[categoryId]}
                <span onClick={() => deleteCategory(categoryId)}>✖️</span>
              </li>
            );
          })}
        </ul>
      )}
      <select onChange={onListChange}>
        <option value="">Select menu category</option>
        {allMenus.map((menu) => {
          return (
            <optgroup label={menu.name}>
              {menu.categories.map((category) => {
                return (
                  <option value={category.id}>
                    {category.name || menu.name}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </>
  );
}

export default NewItemCategoryList;
