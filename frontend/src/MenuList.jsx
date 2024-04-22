import { useEffect, useState } from 'react';
import ItemList from './ItemList';

function MenuList() {
  const [testMenu, setTestMenu] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/items')
      .then((res) => res.json())
      .then((menuData) => {
        setTestMenu(menuData);
        console.log(menuData);
      });
  }, []);
  const menus = ['Breakfast', 'Lunch', 'Snack', 'Dinner', 'Brunch'];
  return (
    <ul id="menuList">
      {menus.map((menu) => (
        <li key={menu}>
          <ItemList name={menu} items={testMenu} />
        </li>
      ))}
    </ul>
  );
}

export default MenuList;
