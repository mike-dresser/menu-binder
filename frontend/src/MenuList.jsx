import { useEffect, useState } from 'react';
import ItemList from './ItemList';

function MenuList() {
  const [testMenu, setTestMenu] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/menus')
      .then((res) => res.json())
      .then((menuData) => {
        setTestMenu(menuData);
        // console.log(menuData);
      });
  }, []);
  return (
    <ul id="menuList">
      {testMenu.map((menu) => (
        <div className="infoBoxContainer">
          <ItemList menu={menu} />
        </div>
      ))}
    </ul>
  );
}

export default MenuList;
