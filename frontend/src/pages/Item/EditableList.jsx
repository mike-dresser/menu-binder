import React, { useContext, useState } from 'react';
import ItemAllergens from './ItemAllergens';
import { EditModeContext } from '../../App';
import NewItemAllergenList from '../NewItem/NewItemAllergenList';

function EditableList({ children, item }) {
  const editMode = useContext(EditModeContext);
  const [newItem, setNewItem] = useState({ ...item });
  console.log('children', children);

  return editMode ? (
    <NewItemAllergenList newItem={newItem} setNewItem={setNewItem} />
  ) : (
    item.allergens && <ItemAllergens item={item} />
  );
}

export default EditableList;
