import React, { useContext, useEffect, useState } from 'react';
import ItemAllergens from './ItemAllergens';
import { EditModeContext } from '../../App';
import NewItemAllergenList from '../NewItem/NewItemAllergenList';
import { HiOutlinePencil, HiCheck, HiX } from 'react-icons/hi';
import api from '../../services/api-client';

function EditableList({ children, item, setItem }) {
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
  async function onSubmit() {
    const content = { allergens: newItem.allergens };
    console.log('content to patch', content);
    const response = await api.patch(`/items/${item.id}`, content);
    console.log('response', response);
    setEnableEdit(false);
    setItem({ ...item, ...content });
  }
  function onCancel() {
    setEnableEdit(false);
  }
  return (
    <div className="editableField">
      {enableEdit ? (
        <NewItemAllergenList newItem={newItem} setNewItem={setNewItem} />
      ) : (
        item.allergens && <ItemAllergens item={item} />
      )}
      {editMode &&
        (enableEdit ? (
          <div>
            <span onClick={onSubmit}>
              <HiCheck />
            </span>
            <span onClick={onCancel}>
              <HiX />
            </span>
          </div>
        ) : (
          <span className="editGlyph" onClick={() => setEnableEdit(true)}>
            <HiOutlinePencil />
          </span>
        ))}
    </div>
  );
}

export default EditableList;
