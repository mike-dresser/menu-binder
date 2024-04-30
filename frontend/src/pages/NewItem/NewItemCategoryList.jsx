import React, { useEffect, useState } from 'react';

function NewItemCategoryList() {
  const [allMenus, setAllMenus] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/menus`)
      .then((res) => res.json())
      .then((data) => {
        setAllMenus(data);
      });
  }, []);
  return (
    <select>
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
  );
}

export default NewItemCategoryList;
