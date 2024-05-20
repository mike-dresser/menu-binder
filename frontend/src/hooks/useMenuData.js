import { useState, useEffect } from 'react';
import api from '../services/api-client';

function useMenuData() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    api.get('/menus').then((res) => setMenuData(res));
  }, []);
  return menuData;
}

export default useMenuData;
