import { useEffect, useState, useContext } from 'react';
import ItemList from '../ItemList';
import { EditModeContext } from '../App';
import { useNavigate } from 'react-router-dom';

function MenuList() {
  const [testMenu, setTestMenu] = useState([]);
  const editMode = useContext(EditModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5555/menus')
      .then((res) => res.json())
      .then((menuData) => {
        setTestMenu(menuData);
        // console.log(menuData);
      });
  }, []);
  return (
    <>
      {editMode && (
        <button className="newItemBtn" onClick={() => navigate('/new')}>
          Add New Item
        </button>
      )}
      <ul id="menuList">
        {testMenu.map((menu) => (
          <div key={`${menu.name}Dialog`} className="dialogContainer">
            <ItemList key={menu.id} menu={menu} />
          </div>
        ))}
      </ul>
    </>
  );
}

export default MenuList;
