import React, { useContext, useEffect, useState } from 'react';
import ItemAllergens from './ItemAllergens';
import { EditModeContext } from '../../App';
import NewItemAllergenList from '../NewItem/NewItemAllergenList';
import { HiOutlinePencil, HiCheck, HiX } from 'react-icons/hi';

function EditableList({ children, item }) {
  const editMode = useContext(EditModeContext);
  const [enableEdit, setEnableEdit] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    allergens: [],
    mise: '',
    price: 0,
    categories: [],
    active: true,
    image: '',
  });
  useEffect(() => {
    setNewItem({ ...item });
  }, [editMode]);

  return (
    <div className="editableField">
      <div>
        {enableEdit ? (
          <NewItemAllergenList newItem={newItem} setNewItem={setNewItem} />
        ) : (
          item.allergens && <ItemAllergens item={item} />
        )}
      </div>
      {editMode && (
        <span className="editGlyph" onClick={() => setEnableEdit(true)}>
          <HiOutlinePencil />
        </span>
      )}
    </div>
  );
}

export default EditableList;
