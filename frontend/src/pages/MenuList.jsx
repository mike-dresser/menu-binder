import { useEffect, useState, useContext } from 'react';
import ItemList from '../ItemList';
import Button from '../components/Button';
import { EditModeContext } from '../App';
import { useNavigate } from 'react-router-dom';
import api from '../services/api-client';

function MenuList() {
  const [testMenu, setTestMenu] = useState([]);
  const editMode = useContext(EditModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      const menuData = await api.get('/menus');
      setTestMenu(menuData);
    };
    fetchMenuData();
  }, []);
  return (
    <>
      {editMode && (
        <div id="newItemBtn">
          <Button type="outline" action={() => navigate('/new')}>
            Add New Item
          </Button>
        </div>
      )}
      <ul id="menuList">
        {testMenu &&
          testMenu.map((menu) => (
            <div key={`${menu.name}Dialog`} className="dialogContainer">
              <ItemList key={menu.id} menu={menu} />
            </div>
          ))}
      </ul>
    </>
  );
}

export default MenuList;
