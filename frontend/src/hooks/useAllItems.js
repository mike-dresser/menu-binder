import { useState, useEffect } from 'react';
import api from '../services/api-client';

function useAlltems() {
  const [allItems, setAllItems] = useState([]);
  useEffect(() => {
    api.get('/items').then((res) => setAllItems(res));
  }, []);
  return allItems;
}

export default useAlltems;
