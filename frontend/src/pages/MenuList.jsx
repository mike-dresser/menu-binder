import { useContext } from 'react';
import ItemList from '../ItemList';
import Button from '../components/Button';
import { EditModeContext } from '../App';
import { useNavigate } from 'react-router-dom';
import useMenuData from '../hooks/useMenuData';
import useAlltems from '../hooks/useAllItems';

function MenuList() {
  const editMode = useContext(EditModeContext);
  const navigate = useNavigate();
  const menuData = useMenuData();
  const allItems = useAlltems();

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
        {menuData.length > 0 &&
          menuData.map((menu) => (
            <div key={`${menu.name}Dialog`} className="dialogContainer">
              <ItemList key={menu.id} menu={menu} allItems={allItems} />
            </div>
          ))}
      </ul>
    </>
  );
}

export default MenuList;
